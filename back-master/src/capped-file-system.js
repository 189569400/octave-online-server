/*
 * Copyright © 2018, Octave Online LLC
 *
 * This file is part of Octave Online Server.
 *
 * Octave Online Server is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Octave Online Server is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public
 * License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Octave Online Server.  If not, see
 * <https://www.gnu.org/licenses/>.
 */

"use strict";

const async = require("async");
const temp = require("temp");
const child_process = require("child_process");
const fs = require("fs");
const path = require("path");
const logger = require("@oo/shared").logger;
const OnlineOffline = require("@oo/shared").OnlineOffline;
const config = require("@oo/shared").config;

// This file is based on http://souptonuts.sourceforge.net/quota_tutorial.html

const IMG_FILE_NAME = "img.ext3";
const IMG_MNT_DIR = "mnt";
const IMG_DATA_DIR = "data";

class CappedFileSystem extends OnlineOffline {
	constructor(sessCode, size) {
		super();
		this.sessCode = sessCode;
		this._log = logger("capped-file-system:" + sessCode);
		this._mlog = logger("capped-file-system:" + sessCode + ":minor");

		this._size = size;
	}

	_doCreate(next) {
		this._cleanups = [];

		async.series([
			(_next) => {
				this._mlog.trace("Making temp dir...");
				temp.mkdir("oo-", (err, tmpdir) => {
					if (tmpdir) this._tmpdir = tmpdir;
					if (!err) this._cleanups.unshift((__next) => {
						this._mlog.trace("Removing temp dir...");
						fs.rmdir(tmpdir, __next);
					});
					_next(err);
				});
			},
			(_next) => {
				this._mlog.debug("Created temp dir:", this._tmpdir);
				this._mlog.trace("Allocating space for filesystem...");
				const imgFileName = path.join(this._tmpdir, IMG_FILE_NAME);
				// eslint-disable-next-line no-unused-vars
				child_process.execFile("dd", ["if=/dev/zero", `of=${imgFileName}`, "bs=1k", `count=${this._size}`], (err, stdout, stderr) => {
					if (!err) this._cleanups.unshift((__next) => {
						this._mlog.trace("Removing file system...");
						fs.unlink(imgFileName, __next);
					});
					_next(err);
				});
			},
			(_next) => {
				this._mlog.trace("Formatting file system...");
				const imgFileName = path.join(this._tmpdir, IMG_FILE_NAME);
				child_process.execFile("mkfs", ["-t", "ext3", "-q", imgFileName, "-F"], (err, stdout, stderr) => {
					if (stderr) err = new Error(stderr);
					_next(err);
				});
			},
			(_next) => {
				this._mlog.trace("Creating mount directory...");
				const imgMntDir = path.join(this._tmpdir, IMG_MNT_DIR);
				fs.mkdir(imgMntDir, 0o700, (err) => {
					if (!err) this._cleanups.unshift((__next) => {
						this._mlog.trace("Removing mount directory...");
						fs.rmdir(imgMntDir, __next);
					});
					_next(err);
				});
			},
			(_next) => {
				this._mlog.trace("Mounting file system...");
				const imgFileName = path.join(this._tmpdir, IMG_FILE_NAME);
				const imgMntDir = path.join(this._tmpdir, IMG_MNT_DIR);
				child_process.execFile("sudo", ["mount", "-o", "loop,rw", imgFileName, imgMntDir], (err, stdout, stderr) => {
					if (stderr) err = new Error(stderr);
					if (!err) this._cleanups.unshift((__next) => {
						this._mlog.trace("Unmounting file system...");
						child_process.execFile("sudo", ["umount", imgMntDir], __next);
					});
					_next(err);
				});
			},
			(_next) => {
				this._mlog.trace("Claiming ownership of file system root...");
				const imgMntDir = path.join(this._tmpdir, IMG_MNT_DIR);
				child_process.execFile("sudo", ["chown", config.worker.uid+":"+config.worker.uid, imgMntDir], (err, stdout, stderr) => {
					if (stderr) err = new Error(stderr);
					_next(err);
				});
			},
			(_next) => {
				this._mlog.trace("Creating data directory...");
				const imgDataDir = path.join(this._tmpdir, IMG_MNT_DIR, IMG_DATA_DIR);
				fs.mkdir(imgDataDir, 0o700, (err) => {
					// Cleanup function not necessary here because the directory resides in the guest filesystem
					_next(err);
				});
			}
		], (err) => {
			const imgDataDir = path.join(this._tmpdir, IMG_MNT_DIR, IMG_DATA_DIR);
			this.dir = imgDataDir;
			return next(err, imgDataDir);
		});
	}

	_doDestroy(next) {
		async.series(this._cleanups, (err) => {
			if (err) return next(err);
			this._enabled = false;
			this._cleanups = null;
			this._tmpdir = null;
			this.dir = null;
			return next(null);
		});
	}
}

/// An alternative to CappedFileSystem when sudo is unavailable.
/// This class does *not* limit file sizes.
class TmpWorkDirectory extends OnlineOffline {
	constructor(sessCode) {
		super();
		this.sessCode = sessCode;
		this._mlog = logger("tmp-work-directory:" + sessCode + ":minor");
	}

	_doCreate(next) {
		this._cleanups = [];

		async.series([
			(_next) => {
				this._mlog.trace("Making directory...");
				temp.mkdir("oo-", (err, tmpdir) => {
					if (tmpdir) this.dir = tmpdir;
					if (!err) this._cleanups.unshift((__next) => {
						this._mlog.trace("Removing directory...");
						child_process.execFile("rm", ["-rf", tmpdir], __next);
					});
					this._mlog.debug("Created directory:", this.dir);
					_next(err);
				});
			},
		], (err) => {
			return next(err, this.dir);
		});
	}

	_doDestroy(next) {
		async.series(this._cleanups, (err) => {
			if (err) return next(err);
			this._enabled = false;
			this._cleanups = null;
			this.dir = null;
			return next(null);
		});
	}
}

module.exports = {
	CappedFileSystem,
	TmpWorkDirectory
};
