//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/steeve_jquery-qrcode/packages/steeve_jquery-qrcode.js                                                      //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/steeve:jquery-qrcode/lib/jquery.qrcode-0.2.js                                                        //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
/*! jQuery.qrcode 0.2 - //larsjung.de/qrcode - MIT License */                                                    // 1
                                                                                                                 // 2
// Uses [QR Code Generator](http://www.d-project.com/qrcode/index.html) (MIT), appended to the end of this file. // 3
// Kudos to [jquery.qrcode.js](http://github.com/jeromeetienne/jquery-qrcode) (MIT).                             // 4
                                                                                                                 // 5
(function ($) {                                                                                                  // 6
	'use strict';                                                                                                   // 7
                                                                                                                 // 8
		// Wrapper for the original QR code generator.                                                                 // 9
	var createQr = function (typeNumber, correctLevel, text) {                                                      // 10
                                                                                                                 // 11
			// qrcode is the single public function that will be defined by the `QR Code Generator`                       // 12
			// at the end of the file.                                                                                    // 13
			var qr = qrcode(typeNumber, correctLevel);                                                                    // 14
			qr.addData(text);                                                                                             // 15
			qr.make();                                                                                                    // 16
                                                                                                                 // 17
			return qr;                                                                                                    // 18
		},                                                                                                             // 19
                                                                                                                 // 20
		// Returns a minimal QR code for the given text. Returns `null` if `text`                                      // 21
		// is to long to be encoded. At the moment it should work with up to 271 characters.                           // 22
		createBestQr = function (text) {                                                                               // 23
                                                                                                                 // 24
			for (var type = 2; type <= 40; type += 1) {                                                                   // 25
				try {                                                                                                        // 26
					return createQr(type, 'L', text);                                                                           // 27
				} catch (err) {}                                                                                             // 28
			}                                                                                                             // 29
                                                                                                                 // 30
			return null;                                                                                                  // 31
		},                                                                                                             // 32
                                                                                                                 // 33
		// Returns a `canvas` element representing the QR code for the given settings.                                 // 34
		createCanvas = function (settings) {                                                                           // 35
                                                                                                                 // 36
			var qr = createBestQr(settings.text),                                                                         // 37
				$canvas = $('<canvas/>').attr('width', settings.width).attr('height', settings.height),                      // 38
				ctx = $canvas[0].getContext('2d');                                                                           // 39
                                                                                                                 // 40
			if (settings.bgColor) {                                                                                       // 41
				ctx.fillStyle = settings.bgColor;                                                                            // 42
				ctx.fillRect(0, 0, settings.width, settings.height);                                                         // 43
			}                                                                                                             // 44
                                                                                                                 // 45
			if (qr) {                                                                                                     // 46
				var moduleCount = qr.getModuleCount(),                                                                       // 47
					moduleWidth = settings.width / moduleCount,                                                                 // 48
					moduleHeight = settings.height / moduleCount,                                                               // 49
					row, col;                                                                                                   // 50
                                                                                                                 // 51
				ctx.beginPath();                                                                                             // 52
				for (row = 0; row < moduleCount; row += 1) {                                                                 // 53
					for (col = 0; col < moduleCount; col += 1) {                                                                // 54
						if (qr.isDark(row, col)) {                                                                                 // 55
							ctx.rect(col * moduleWidth, row * moduleHeight, moduleWidth, moduleHeight);                               // 56
						}                                                                                                          // 57
					}                                                                                                           // 58
				}                                                                                                            // 59
				ctx.fillStyle = settings.color;                                                                              // 60
				ctx.fill();                                                                                                  // 61
			}                                                                                                             // 62
                                                                                                                 // 63
			return $canvas;                                                                                               // 64
		},                                                                                                             // 65
                                                                                                                 // 66
		// Returns a `div` element representing the QR code for the given settings.                                    // 67
		createDiv = function (settings) {                                                                              // 68
                                                                                                                 // 69
			var qr = createBestQr(settings.text),                                                                         // 70
				$div = $('<div/>').css({                                                                                     // 71
										position: 'relative',                                                                                  // 72
										left: 0,                                                                                               // 73
										top: 0,                                                                                                // 74
										padding: 0,                                                                                            // 75
										margin: 0,                                                                                             // 76
										width: settings.width,                                                                                 // 77
										height: settings.height                                                                                // 78
									});                                                                                                     // 79
                                                                                                                 // 80
			if (settings.bgColor) {                                                                                       // 81
				$div.css('background-color', settings.bgColor);                                                              // 82
			}                                                                                                             // 83
                                                                                                                 // 84
			if (qr) {                                                                                                     // 85
				var moduleCount = qr.getModuleCount(),                                                                       // 86
					moduleWidth = Math.floor(settings.width / moduleCount),                                                     // 87
					moduleHeight = Math.floor(settings.height / moduleCount),                                                   // 88
					offsetLeft = Math.floor(0.5 * (settings.width - moduleWidth * moduleCount)),                                // 89
					offsetTop = Math.floor(0.5 * (settings.height - moduleHeight * moduleCount)),                               // 90
					row, col;                                                                                                   // 91
                                                                                                                 // 92
				for (row = 0; row < moduleCount; row += 1) {                                                                 // 93
					for (col = 0; col < moduleCount; col += 1) {                                                                // 94
						if (qr.isDark(row, col)) {                                                                                 // 95
							$('<div/>')                                                                                               // 96
								.css({                                                                                                   // 97
									left: offsetLeft + col * moduleWidth,                                                                   // 98
									top: offsetTop + row * moduleHeight                                                                     // 99
								})                                                                                                       // 100
								.appendTo($div);                                                                                         // 101
						}                                                                                                          // 102
					}                                                                                                           // 103
				}                                                                                                            // 104
                                                                                                                 // 105
				$div.children()                                                                                              // 106
							.css({                                                                                                    // 107
								position: 'absolute',                                                                                    // 108
								padding: 0,                                                                                              // 109
								margin: 0,                                                                                               // 110
								width: moduleWidth,                                                                                      // 111
								height: moduleHeight,                                                                                    // 112
								'background-color': settings.color                                                                       // 113
							});                                                                                                       // 114
			}                                                                                                             // 115
                                                                                                                 // 116
			return $div;                                                                                                  // 117
		},                                                                                                             // 118
                                                                                                                 // 119
		// Plugin                                                                                                      // 120
		// ======                                                                                                      // 121
                                                                                                                 // 122
		// Default settings                                                                                            // 123
		// ----------------                                                                                            // 124
		defaults = {                                                                                                   // 125
                                                                                                                 // 126
			// render method: `'canvas'` or `'div'`                                                                       // 127
			render: 'canvas',                                                                                             // 128
                                                                                                                 // 129
			// width and height in pixel                                                                                  // 130
			width: 256,                                                                                                   // 131
			height: 256,                                                                                                  // 132
                                                                                                                 // 133
			// code color                                                                                                 // 134
			color: '#000',                                                                                                // 135
                                                                                                                 // 136
			// background color, `null` for transparent background                                                        // 137
			bgColor: null,                                                                                                // 138
                                                                                                                 // 139
			// the encoded text                                                                                           // 140
			text: 'no text'                                                                                               // 141
		};                                                                                                             // 142
                                                                                                                 // 143
	// Register the plugin                                                                                          // 144
	// -------------------                                                                                          // 145
	$.fn.qrcode = function(options) {                                                                               // 146
                                                                                                                 // 147
		var settings = $.extend({}, defaults, options);                                                                // 148
                                                                                                                 // 149
		return this.each(function () {                                                                                 // 150
                                                                                                                 // 151
			$(this).append(settings.render === 'canvas' ? createCanvas(settings) : createDiv(settings));                  // 152
		});                                                                                                            // 153
	};                                                                                                              // 154
                                                                                                                 // 155
	// jQuery.qrcode plug in code ends here                                                                         // 156
                                                                                                                 // 157
	// QR Code Generator                                                                                            // 158
	// =================                                                                                            // 159
	//---------------------------------------------------------------------                                        // 160
	//                                                                                                             // 161
	// QR Code Generator for JavaScript                                                                            // 162
	//                                                                                                             // 163
	// Copyright (c) 2009 Kazuhiko Arase                                                                           // 164
	//                                                                                                             // 165
	// URL: http://www.d-project.com/                                                                              // 166
	//                                                                                                             // 167
	// Licensed under the MIT license:                                                                             // 168
	//	http://www.opensource.org/licenses/mit-license.php                                                          // 169
	//                                                                                                             // 170
	// The word 'QR Code' is registered trademark of                                                               // 171
	// DENSO WAVE INCORPORATED                                                                                     // 172
	//	http://www.denso-wave.com/qrcode/faqpatent-e.html                                                           // 173
	//                                                                                                             // 174
	//---------------------------------------------------------------------                                        // 175
	var qrcode = function() {                                                                                      // 176
		//---------------------------------------------------------------------                                       // 177
		// qrcode                                                                                                     // 178
		//---------------------------------------------------------------------                                       // 179
		/**                                                                                                           // 180
		 * qrcode                                                                                                     // 181
		 * @param typeNumber 1 to 10                                                                                  // 182
		 * @param errorCorrectLevel 'L','M','Q','H'                                                                   // 183
		 */                                                                                                           // 184
		var qrcode = function(typeNumber, errorCorrectLevel) {                                                        // 185
			var PAD0 = 0xEC;                                                                                             // 186
			var PAD1 = 0x11;                                                                                             // 187
			var _typeNumber = typeNumber;                                                                                // 188
			var _errorCorrectLevel = QRErrorCorrectLevel[errorCorrectLevel];                                             // 189
			var _modules = null;                                                                                         // 190
			var _moduleCount = 0;                                                                                        // 191
			var _dataCache = null;                                                                                       // 192
			var _dataList = new Array();                                                                                 // 193
			var _this = {};                                                                                              // 194
			var makeImpl = function(test, maskPattern) {                                                                 // 195
				_moduleCount = _typeNumber * 4 + 17;                                                                        // 196
				_modules = function(moduleCount) {                                                                          // 197
					var modules = new Array(moduleCount);                                                                      // 198
					for (var row = 0; row < moduleCount; row += 1) {                                                           // 199
						modules[row] = new Array(moduleCount);                                                                    // 200
						for (var col = 0; col < moduleCount; col += 1) {                                                          // 201
							modules[row][col] = null;                                                                                // 202
						}                                                                                                         // 203
					}                                                                                                          // 204
					return modules;                                                                                            // 205
				}(_moduleCount);                                                                                            // 206
				setupPositionProbePattern(0, 0);                                                                            // 207
				setupPositionProbePattern(_moduleCount - 7, 0);                                                             // 208
				setupPositionProbePattern(0, _moduleCount - 7);                                                             // 209
				setupPositionAdjustPattern();                                                                               // 210
				setupTimingPattern();                                                                                       // 211
				setupTypeInfo(test, maskPattern);                                                                           // 212
				if (_typeNumber >= 7) {                                                                                     // 213
					setupTypeNumber(test);                                                                                     // 214
				}                                                                                                           // 215
				if (_dataCache == null) {                                                                                   // 216
					_dataCache = createData(_typeNumber, _errorCorrectLevel, _dataList);                                       // 217
				}                                                                                                           // 218
				mapData(_dataCache, maskPattern);                                                                           // 219
			};                                                                                                           // 220
			var setupPositionProbePattern = function(row, col) {                                                         // 221
				for (var r = -1; r <= 7; r += 1) {                                                                          // 222
					if (row + r <= -1 || _moduleCount <= row + r) continue;                                                    // 223
					for (var c = -1; c <= 7; c += 1) {                                                                         // 224
						if (col + c <= -1 || _moduleCount <= col + c) continue;                                                   // 225
						if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )                                                            // 226
								|| (0 <= c && c <= 6 && (r == 0 || r == 6) )                                                            // 227
								|| (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {                                                           // 228
							_modules[row + r][col + c] = true;                                                                       // 229
						} else {                                                                                                  // 230
							_modules[row + r][col + c] = false;                                                                      // 231
						}                                                                                                         // 232
					}                                                                                                          // 233
				}                                                                                                           // 234
			};                                                                                                           // 235
			var getBestMaskPattern = function() {                                                                        // 236
				var minLostPoint = 0;                                                                                       // 237
				var pattern = 0;                                                                                            // 238
				for (var i = 0; i < 8; i += 1) {                                                                            // 239
					makeImpl(true, i);                                                                                         // 240
					var lostPoint = QRUtil.getLostPoint(_this);                                                                // 241
					if (i == 0 || minLostPoint > lostPoint) {                                                                  // 242
						minLostPoint = lostPoint;                                                                                 // 243
						pattern = i;                                                                                              // 244
					}                                                                                                          // 245
				}                                                                                                           // 246
				return pattern;                                                                                             // 247
			};                                                                                                           // 248
			var setupTimingPattern = function() {                                                                        // 249
				for (var r = 8; r < _moduleCount - 8; r += 1) {                                                             // 250
					if (_modules[r][6] != null) {                                                                              // 251
						continue;                                                                                                 // 252
					}                                                                                                          // 253
					_modules[r][6] = (r % 2 == 0);                                                                             // 254
				}                                                                                                           // 255
				for (var c = 8; c < _moduleCount - 8; c += 1) {                                                             // 256
					if (_modules[6][c] != null) {                                                                              // 257
						continue;                                                                                                 // 258
					}                                                                                                          // 259
					_modules[6][c] = (c % 2 == 0);                                                                             // 260
				}                                                                                                           // 261
			};                                                                                                           // 262
			var setupPositionAdjustPattern = function() {                                                                // 263
				var pos = QRUtil.getPatternPosition(_typeNumber);                                                           // 264
				for (var i = 0; i < pos.length; i += 1) {                                                                   // 265
					for (var j = 0; j < pos.length; j += 1) {                                                                  // 266
						var row = pos[i];                                                                                         // 267
						var col = pos[j];                                                                                         // 268
						if (_modules[row][col] != null) {                                                                         // 269
							continue;                                                                                                // 270
						}                                                                                                         // 271
						for (var r = -2; r <= 2; r += 1) {                                                                        // 272
							for (var c = -2; c <= 2; c += 1) {                                                                       // 273
								if (r == -2 || r == 2 || c == -2 || c == 2                                                              // 274
										|| (r == 0 && c == 0) ) {                                                                             // 275
									_modules[row + r][col + c] = true;                                                                     // 276
								} else {                                                                                                // 277
									_modules[row + r][col + c] = false;                                                                    // 278
								}                                                                                                       // 279
							}                                                                                                        // 280
						}                                                                                                         // 281
					}                                                                                                          // 282
				}                                                                                                           // 283
			};                                                                                                           // 284
			var setupTypeNumber = function(test) {                                                                       // 285
				var bits = QRUtil.getBCHTypeNumber(_typeNumber);                                                            // 286
				for (var i = 0; i < 18; i += 1) {                                                                           // 287
					var mod = (!test && ( (bits >> i) & 1) == 1);                                                              // 288
					_modules[Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;                                           // 289
				}                                                                                                           // 290
				for (var i = 0; i < 18; i += 1) {                                                                           // 291
					var mod = (!test && ( (bits >> i) & 1) == 1);                                                              // 292
					_modules[i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;                                           // 293
				}                                                                                                           // 294
			};                                                                                                           // 295
			var setupTypeInfo = function(test, maskPattern) {                                                            // 296
				var data = (_errorCorrectLevel << 3) | maskPattern;                                                         // 297
				var bits = QRUtil.getBCHTypeInfo(data);                                                                     // 298
				// vertical                                                                                                 // 299
				for (var i = 0; i < 15; i += 1) {                                                                           // 300
					var mod = (!test && ( (bits >> i) & 1) == 1);                                                              // 301
					if (i < 6) {                                                                                               // 302
						_modules[i][8] = mod;                                                                                     // 303
					} else if (i < 8) {                                                                                        // 304
						_modules[i + 1][8] = mod;                                                                                 // 305
					} else {                                                                                                   // 306
						_modules[_moduleCount - 15 + i][8] = mod;                                                                 // 307
					}                                                                                                          // 308
				}                                                                                                           // 309
				// horizontal                                                                                               // 310
				for (var i = 0; i < 15; i += 1) {                                                                           // 311
					var mod = (!test && ( (bits >> i) & 1) == 1);                                                              // 312
					if (i < 8) {                                                                                               // 313
						_modules[8][_moduleCount - i - 1] = mod;                                                                  // 314
					} else if (i < 9) {                                                                                        // 315
						_modules[8][15 - i - 1 + 1] = mod;                                                                        // 316
					} else {                                                                                                   // 317
						_modules[8][15 - i - 1] = mod;                                                                            // 318
					}                                                                                                          // 319
				}                                                                                                           // 320
				// fixed module                                                                                             // 321
				_modules[_moduleCount - 8][8] = (!test);                                                                    // 322
			};                                                                                                           // 323
			var mapData = function(data, maskPattern) {                                                                  // 324
				var inc = -1;                                                                                               // 325
				var row = _moduleCount - 1;                                                                                 // 326
				var bitIndex = 7;                                                                                           // 327
				var byteIndex = 0;                                                                                          // 328
				var maskFunc = QRUtil.getMaskFunction(maskPattern);                                                         // 329
				for (var col = _moduleCount - 1; col > 0; col -= 2) {                                                       // 330
					if (col == 6) col -= 1;                                                                                    // 331
					while (true) {                                                                                             // 332
						for (var c = 0; c < 2; c += 1) {                                                                          // 333
							if (_modules[row][col - c] == null) {                                                                    // 334
								var dark = false;                                                                                       // 335
								if (byteIndex < data.length) {                                                                          // 336
									dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);                                                  // 337
								}                                                                                                       // 338
								var mask = maskFunc(row, col - c);                                                                      // 339
								if (mask) {                                                                                             // 340
									dark = !dark;                                                                                          // 341
								}                                                                                                       // 342
								_modules[row][col - c] = dark;                                                                          // 343
								bitIndex -= 1;                                                                                          // 344
								if (bitIndex == -1) {                                                                                   // 345
									byteIndex += 1;                                                                                        // 346
									bitIndex = 7;                                                                                          // 347
								}                                                                                                       // 348
							}                                                                                                        // 349
						}                                                                                                         // 350
						row += inc;                                                                                               // 351
						if (row < 0 || _moduleCount <= row) {                                                                     // 352
							row -= inc;                                                                                              // 353
							inc = -inc;                                                                                              // 354
							break;                                                                                                   // 355
						}                                                                                                         // 356
					}                                                                                                          // 357
				}                                                                                                           // 358
			};                                                                                                           // 359
			var createBytes = function(buffer, rsBlocks) {                                                               // 360
				var offset = 0;                                                                                             // 361
				var maxDcCount = 0;                                                                                         // 362
				var maxEcCount = 0;                                                                                         // 363
				var dcdata = new Array(rsBlocks.length);                                                                    // 364
				var ecdata = new Array(rsBlocks.length);                                                                    // 365
				for (var r = 0; r < rsBlocks.length; r += 1) {                                                              // 366
					var dcCount = rsBlocks[r].dataCount;                                                                       // 367
					var ecCount = rsBlocks[r].totalCount - dcCount;                                                            // 368
					maxDcCount = Math.max(maxDcCount, dcCount);                                                                // 369
					maxEcCount = Math.max(maxEcCount, ecCount);                                                                // 370
					dcdata[r] = new Array(dcCount);                                                                            // 371
					for (var i = 0; i < dcdata[r].length; i += 1) {                                                            // 372
						dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];                                                     // 373
					}                                                                                                          // 374
					offset += dcCount;                                                                                         // 375
					var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);                                                    // 376
					var rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);                                             // 377
					var modPoly = rawPoly.mod(rsPoly);                                                                         // 378
					ecdata[r] = new Array(rsPoly.getLength() - 1);                                                             // 379
					for (var i = 0; i < ecdata[r].length; i += 1) {                                                            // 380
						var modIndex = i + modPoly.getLength() - ecdata[r].length;                                                // 381
						ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;                                                // 382
					}                                                                                                          // 383
				}                                                                                                           // 384
				var totalCodeCount = 0;                                                                                     // 385
				for (var i = 0; i < rsBlocks.length; i += 1) {                                                              // 386
					totalCodeCount += rsBlocks[i].totalCount;                                                                  // 387
				}                                                                                                           // 388
				var data = new Array(totalCodeCount);                                                                       // 389
				var index = 0;                                                                                              // 390
				for (var i = 0; i < maxDcCount; i += 1) {                                                                   // 391
					for (var r = 0; r < rsBlocks.length; r += 1) {                                                             // 392
						if (i < dcdata[r].length) {                                                                               // 393
							data[index] = dcdata[r][i];                                                                              // 394
							index += 1;                                                                                              // 395
						}                                                                                                         // 396
					}                                                                                                          // 397
				}                                                                                                           // 398
				for (var i = 0; i < maxEcCount; i += 1) {                                                                   // 399
					for (var r = 0; r < rsBlocks.length; r += 1) {                                                             // 400
						if (i < ecdata[r].length) {                                                                               // 401
							data[index] = ecdata[r][i];                                                                              // 402
							index += 1;                                                                                              // 403
						}                                                                                                         // 404
					}                                                                                                          // 405
				}                                                                                                           // 406
				return data;                                                                                                // 407
			};                                                                                                           // 408
			var createData = function(typeNumber, errorCorrectLevel, dataList) {                                         // 409
				var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);                                        // 410
				var buffer = qrBitBuffer();                                                                                 // 411
				for (var i = 0; i < dataList.length; i += 1) {                                                              // 412
					var data = dataList[i];                                                                                    // 413
					buffer.put(data.getMode(), 4);                                                                             // 414
					buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber) );                         // 415
					data.write(buffer);                                                                                        // 416
				}                                                                                                           // 417
				// calc num max data.                                                                                       // 418
				var totalDataCount = 0;                                                                                     // 419
				for (var i = 0; i < rsBlocks.length; i += 1) {                                                              // 420
					totalDataCount += rsBlocks[i].dataCount;                                                                   // 421
				}                                                                                                           // 422
				if (buffer.getLengthInBits() > totalDataCount * 8) {                                                        // 423
					throw new Error('code length overflow. ('                                                                  // 424
						+ buffer.getLengthInBits()                                                                                // 425
						+ '>'                                                                                                     // 426
						+ totalDataCount * 8                                                                                      // 427
						+ ')');                                                                                                   // 428
				}                                                                                                           // 429
				// end code                                                                                                 // 430
				if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {                                                   // 431
					buffer.put(0, 4);                                                                                          // 432
				}                                                                                                           // 433
				// padding                                                                                                  // 434
				while (buffer.getLengthInBits() % 8 != 0) {                                                                 // 435
					buffer.putBit(false);                                                                                      // 436
				}                                                                                                           // 437
				// padding                                                                                                  // 438
				while (true) {                                                                                              // 439
					if (buffer.getLengthInBits() >= totalDataCount * 8) {                                                      // 440
						break;                                                                                                    // 441
					}                                                                                                          // 442
					buffer.put(PAD0, 8);                                                                                       // 443
					if (buffer.getLengthInBits() >= totalDataCount * 8) {                                                      // 444
						break;                                                                                                    // 445
					}                                                                                                          // 446
					buffer.put(PAD1, 8);                                                                                       // 447
				}                                                                                                           // 448
				return createBytes(buffer, rsBlocks);                                                                       // 449
			};                                                                                                           // 450
			_this.addData = function(data) {                                                                             // 451
				var newData = qr8BitByte(data);                                                                             // 452
				_dataList.push(newData);                                                                                    // 453
				_dataCache = null;                                                                                          // 454
			};                                                                                                           // 455
			_this.isDark = function(row, col) {                                                                          // 456
				if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {                                     // 457
					throw new Error(row + ',' + col);                                                                          // 458
				}                                                                                                           // 459
				return _modules[row][col];                                                                                  // 460
			};                                                                                                           // 461
			_this.getModuleCount = function() {                                                                          // 462
				return _moduleCount;                                                                                        // 463
			};                                                                                                           // 464
			_this.make = function() {                                                                                    // 465
				makeImpl(false, getBestMaskPattern() );                                                                     // 466
			};                                                                                                           // 467
			_this.createTableTag = function(cellSize, margin) {                                                          // 468
				cellSize = cellSize || 2;                                                                                   // 469
				margin = (typeof margin == 'undefined')? cellSize * 4 : margin;                                             // 470
				var qrHtml = '';                                                                                            // 471
				qrHtml += '<table style="';                                                                                 // 472
				qrHtml += ' border-width: 0px; border-style: none;';                                                        // 473
				qrHtml += ' border-collapse: collapse;';                                                                    // 474
				qrHtml += ' padding: 0px; margin: ' + margin + 'px;';                                                       // 475
				qrHtml += '">';                                                                                             // 476
				qrHtml += '<tbody>';                                                                                        // 477
				for (var r = 0; r < _this.getModuleCount(); r += 1) {                                                       // 478
					qrHtml += '<tr>';                                                                                          // 479
					for (var c = 0; c < _this.getModuleCount(); c += 1) {                                                      // 480
						qrHtml += '<td style="';                                                                                  // 481
						qrHtml += ' border-width: 0px; border-style: none;';                                                      // 482
						qrHtml += ' border-collapse: collapse;';                                                                  // 483
						qrHtml += ' padding: 0px; margin: 0px;';                                                                  // 484
						qrHtml += ' width: ' + cellSize + 'px;';                                                                  // 485
						qrHtml += ' height: ' + cellSize + 'px;';                                                                 // 486
						qrHtml += ' background-color: ';                                                                          // 487
						qrHtml += _this.isDark(r, c)? '#000000' : '#ffffff';                                                      // 488
						qrHtml += ';';                                                                                            // 489
						qrHtml += '"/>';                                                                                          // 490
					}                                                                                                          // 491
					qrHtml += '</tr>';                                                                                         // 492
				}                                                                                                           // 493
				qrHtml += '</tbody>';                                                                                       // 494
				qrHtml += '</table>';                                                                                       // 495
				return qrHtml;                                                                                              // 496
			};                                                                                                           // 497
			_this.createImgTag = function(cellSize, margin) {                                                            // 498
				cellSize = cellSize || 2;                                                                                   // 499
				margin = (typeof margin == 'undefined')? cellSize * 4 : margin;                                             // 500
				var size = _this.getModuleCount() * cellSize + margin * 2;                                                  // 501
				var min = margin;                                                                                           // 502
				var max = size - margin;                                                                                    // 503
				return createImgTag(size, size, function(x, y) {                                                            // 504
					if (min <= x && x < max && min <= y && y < max) {                                                          // 505
						var c = Math.floor( (x - min) / cellSize);                                                                // 506
						var r = Math.floor( (y - min) / cellSize);                                                                // 507
						return _this.isDark(r, c)? 0 : 1;                                                                         // 508
					} else {                                                                                                   // 509
						return 1;                                                                                                 // 510
					}                                                                                                          // 511
				} );                                                                                                        // 512
			};                                                                                                           // 513
			return _this;                                                                                                // 514
		};                                                                                                            // 515
		//---------------------------------------------------------------------                                       // 516
		// qrcode.stringToBytes                                                                                       // 517
		//---------------------------------------------------------------------                                       // 518
		qrcode.stringToBytes = function(s) {                                                                          // 519
			var bytes = new Array();                                                                                     // 520
			for (var i = 0; i < s.length; i += 1) {                                                                      // 521
				var c = s.charCodeAt(i);                                                                                    // 522
				bytes.push(c & 0xff);                                                                                       // 523
			}                                                                                                            // 524
			return bytes;                                                                                                // 525
		};                                                                                                            // 526
		//---------------------------------------------------------------------                                       // 527
		// qrcode.createStringToBytes                                                                                 // 528
		//---------------------------------------------------------------------                                       // 529
		/**                                                                                                           // 530
		 * @param unicodeData base64 string of byte array.                                                            // 531
		 * [16bit Unicode],[16bit Bytes], ...                                                                         // 532
		 * @param numChars                                                                                            // 533
		 */                                                                                                           // 534
		qrcode.createStringToBytes = function(unicodeData, numChars) {                                                // 535
			// create conversion map.                                                                                    // 536
			var unicodeMap = function() {                                                                                // 537
				var bin = base64DecodeInputStream(unicodeData);                                                             // 538
				var read = function() {                                                                                     // 539
					var b = bin.read();                                                                                        // 540
					if (b == -1) throw new Error();                                                                            // 541
					return b;                                                                                                  // 542
				};                                                                                                          // 543
				var count = 0;                                                                                              // 544
				var unicodeMap = {};                                                                                        // 545
				while (true) {                                                                                              // 546
					var b0 = bin.read();                                                                                       // 547
					if (b0 == -1) break;                                                                                       // 548
					var b1 = read();                                                                                           // 549
					var b2 = read();                                                                                           // 550
					var b3 = read();                                                                                           // 551
					var k = String.fromCharCode( (b0 << 8) | b1);                                                              // 552
					var v = (b2 << 8) | b3;                                                                                    // 553
					unicodeMap[k] = v;                                                                                         // 554
					count += 1;                                                                                                // 555
				}                                                                                                           // 556
				if (count != numChars) {                                                                                    // 557
					throw new Error(count + ' != ' + numChars);                                                                // 558
				}                                                                                                           // 559
				return unicodeMap;                                                                                          // 560
			}();                                                                                                         // 561
			var unknownChar = '?'.charCodeAt(0);                                                                         // 562
			return function(s) {                                                                                         // 563
				var bytes = new Array();                                                                                    // 564
				for (var i = 0; i < s.length; i += 1) {                                                                     // 565
					var c = s.charCodeAt(i);                                                                                   // 566
					if (c < 128) {                                                                                             // 567
						bytes.push(c);                                                                                            // 568
					} else {                                                                                                   // 569
						var b = unicodeMap[s.charAt(i)];                                                                          // 570
						if (typeof b == 'number') {                                                                               // 571
							if ( (b & 0xff) == b) {                                                                                  // 572
								// 1byte                                                                                                // 573
								bytes.push(b);                                                                                          // 574
							} else {                                                                                                 // 575
								// 2bytes                                                                                               // 576
								bytes.push(b >>> 8);                                                                                    // 577
								bytes.push(b & 0xff);                                                                                   // 578
							}                                                                                                        // 579
						} else {                                                                                                  // 580
							bytes.push(unknownChar);                                                                                 // 581
						}                                                                                                         // 582
					}                                                                                                          // 583
				}                                                                                                           // 584
				return bytes;                                                                                               // 585
			};                                                                                                           // 586
		};                                                                                                            // 587
		//---------------------------------------------------------------------                                       // 588
		// QRMode                                                                                                     // 589
		//---------------------------------------------------------------------                                       // 590
		var QRMode = {                                                                                                // 591
			MODE_NUMBER :		1 << 0,                                                                                       // 592
			MODE_ALPHA_NUM : 	1 << 1,                                                                                    // 593
			MODE_8BIT_BYTE : 	1 << 2,                                                                                    // 594
			MODE_KANJI :		1 << 3                                                                                         // 595
		};                                                                                                            // 596
		//---------------------------------------------------------------------                                       // 597
		// QRErrorCorrectLevel                                                                                        // 598
		//---------------------------------------------------------------------                                       // 599
		var QRErrorCorrectLevel = {                                                                                   // 600
			L : 1,                                                                                                       // 601
			M : 0,                                                                                                       // 602
			Q : 3,                                                                                                       // 603
			H : 2                                                                                                        // 604
		};                                                                                                            // 605
		//---------------------------------------------------------------------                                       // 606
		// QRMaskPattern                                                                                              // 607
		//---------------------------------------------------------------------                                       // 608
		var QRMaskPattern = {                                                                                         // 609
			PATTERN000 : 0,                                                                                              // 610
			PATTERN001 : 1,                                                                                              // 611
			PATTERN010 : 2,                                                                                              // 612
			PATTERN011 : 3,                                                                                              // 613
			PATTERN100 : 4,                                                                                              // 614
			PATTERN101 : 5,                                                                                              // 615
			PATTERN110 : 6,                                                                                              // 616
			PATTERN111 : 7                                                                                               // 617
		};                                                                                                            // 618
		//---------------------------------------------------------------------                                       // 619
		// QRUtil                                                                                                     // 620
		//---------------------------------------------------------------------                                       // 621
		var QRUtil = function() {                                                                                     // 622
			var PATTERN_POSITION_TABLE = [                                                                               // 623
				[],                                                                                                         // 624
				[6, 18],                                                                                                    // 625
				[6, 22],                                                                                                    // 626
				[6, 26],                                                                                                    // 627
				[6, 30],                                                                                                    // 628
				[6, 34],                                                                                                    // 629
				[6, 22, 38],                                                                                                // 630
				[6, 24, 42],                                                                                                // 631
				[6, 26, 46],                                                                                                // 632
				[6, 28, 50],                                                                                                // 633
				[6, 30, 54],                                                                                                // 634
				[6, 32, 58],                                                                                                // 635
				[6, 34, 62],                                                                                                // 636
				[6, 26, 46, 66],                                                                                            // 637
				[6, 26, 48, 70],                                                                                            // 638
				[6, 26, 50, 74],                                                                                            // 639
				[6, 30, 54, 78],                                                                                            // 640
				[6, 30, 56, 82],                                                                                            // 641
				[6, 30, 58, 86],                                                                                            // 642
				[6, 34, 62, 90],                                                                                            // 643
				[6, 28, 50, 72, 94],                                                                                        // 644
				[6, 26, 50, 74, 98],                                                                                        // 645
				[6, 30, 54, 78, 102],                                                                                       // 646
				[6, 28, 54, 80, 106],                                                                                       // 647
				[6, 32, 58, 84, 110],                                                                                       // 648
				[6, 30, 58, 86, 114],                                                                                       // 649
				[6, 34, 62, 90, 118],                                                                                       // 650
				[6, 26, 50, 74, 98, 122],                                                                                   // 651
				[6, 30, 54, 78, 102, 126],                                                                                  // 652
				[6, 26, 52, 78, 104, 130],                                                                                  // 653
				[6, 30, 56, 82, 108, 134],                                                                                  // 654
				[6, 34, 60, 86, 112, 138],                                                                                  // 655
				[6, 30, 58, 86, 114, 142],                                                                                  // 656
				[6, 34, 62, 90, 118, 146],                                                                                  // 657
				[6, 30, 54, 78, 102, 126, 150],                                                                             // 658
				[6, 24, 50, 76, 102, 128, 154],                                                                             // 659
				[6, 28, 54, 80, 106, 132, 158],                                                                             // 660
				[6, 32, 58, 84, 110, 136, 162],                                                                             // 661
				[6, 26, 54, 82, 110, 138, 166],                                                                             // 662
				[6, 30, 58, 86, 114, 142, 170]                                                                              // 663
			];                                                                                                           // 664
			var G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);                       // 665
			var G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);          // 666
			var G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);                                      // 667
			var _this = {};                                                                                              // 668
			var getBCHDigit = function(data) {                                                                           // 669
				var digit = 0;                                                                                              // 670
				while (data != 0) {                                                                                         // 671
					digit += 1;                                                                                                // 672
					data >>>= 1;                                                                                               // 673
				}                                                                                                           // 674
				return digit;                                                                                               // 675
			};                                                                                                           // 676
			_this.getBCHTypeInfo = function(data) {                                                                      // 677
				var d = data << 10;                                                                                         // 678
				while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {                                                            // 679
					d ^= (G15 << (getBCHDigit(d) - getBCHDigit(G15) ) );                                                       // 680
				}                                                                                                           // 681
				return ( (data << 10) | d) ^ G15_MASK;                                                                      // 682
			};                                                                                                           // 683
			_this.getBCHTypeNumber = function(data) {                                                                    // 684
				var d = data << 12;                                                                                         // 685
				while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {                                                            // 686
					d ^= (G18 << (getBCHDigit(d) - getBCHDigit(G18) ) );                                                       // 687
				}                                                                                                           // 688
				return (data << 12) | d;                                                                                    // 689
			};                                                                                                           // 690
			_this.getPatternPosition = function(typeNumber) {                                                            // 691
				return PATTERN_POSITION_TABLE[typeNumber - 1];                                                              // 692
			};                                                                                                           // 693
			_this.getMaskFunction = function(maskPattern) {                                                              // 694
				switch (maskPattern) {                                                                                      // 695
				case QRMaskPattern.PATTERN000 :                                                                             // 696
					return function(i, j) { return (i + j) % 2 == 0; };                                                        // 697
				case QRMaskPattern.PATTERN001 :                                                                             // 698
					return function(i, j) { return i % 2 == 0; };                                                              // 699
				case QRMaskPattern.PATTERN010 :                                                                             // 700
					return function(i, j) { return j % 3 == 0; };                                                              // 701
				case QRMaskPattern.PATTERN011 :                                                                             // 702
					return function(i, j) { return (i + j) % 3 == 0; };                                                        // 703
				case QRMaskPattern.PATTERN100 :                                                                             // 704
					return function(i, j) { return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0; };                       // 705
				case QRMaskPattern.PATTERN101 :                                                                             // 706
					return function(i, j) { return (i * j) % 2 + (i * j) % 3 == 0; };                                          // 707
				case QRMaskPattern.PATTERN110 :                                                                             // 708
					return function(i, j) { return ( (i * j) % 2 + (i * j) % 3) % 2 == 0; };                                   // 709
				case QRMaskPattern.PATTERN111 :                                                                             // 710
					return function(i, j) { return ( (i * j) % 3 + (i + j) % 2) % 2 == 0; };                                   // 711
				default :                                                                                                   // 712
					throw new Error('bad maskPattern:' + maskPattern);                                                         // 713
				}                                                                                                           // 714
			};                                                                                                           // 715
			_this.getErrorCorrectPolynomial = function(errorCorrectLength) {                                             // 716
				var a = qrPolynomial([1], 0);                                                                               // 717
				for (var i = 0; i < errorCorrectLength; i += 1) {                                                           // 718
					a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0) );                                                     // 719
				}                                                                                                           // 720
				return a;                                                                                                   // 721
			};                                                                                                           // 722
			_this.getLengthInBits = function(mode, type) {                                                               // 723
				if (1 <= type && type < 10) {                                                                               // 724
					// 1 - 9                                                                                                   // 725
					switch(mode) {                                                                                             // 726
					case QRMode.MODE_NUMBER 	: return 10;                                                                      // 727
					case QRMode.MODE_ALPHA_NUM 	: return 9;                                                                    // 728
					case QRMode.MODE_8BIT_BYTE	: return 8;                                                                     // 729
					case QRMode.MODE_KANJI		: return 8;                                                                        // 730
					default :                                                                                                  // 731
						throw new Error('mode:' + mode);                                                                          // 732
					}                                                                                                          // 733
				} else if (type < 27) {                                                                                     // 734
					// 10 - 26                                                                                                 // 735
					switch(mode) {                                                                                             // 736
					case QRMode.MODE_NUMBER 	: return 12;                                                                      // 737
					case QRMode.MODE_ALPHA_NUM 	: return 11;                                                                   // 738
					case QRMode.MODE_8BIT_BYTE	: return 16;                                                                    // 739
					case QRMode.MODE_KANJI		: return 10;                                                                       // 740
					default :                                                                                                  // 741
						throw new Error('mode:' + mode);                                                                          // 742
					}                                                                                                          // 743
				} else if (type < 41) {                                                                                     // 744
					// 27 - 40                                                                                                 // 745
					switch(mode) {                                                                                             // 746
					case QRMode.MODE_NUMBER 	: return 14;                                                                      // 747
					case QRMode.MODE_ALPHA_NUM	: return 13;                                                                    // 748
					case QRMode.MODE_8BIT_BYTE	: return 16;                                                                    // 749
					case QRMode.MODE_KANJI		: return 12;                                                                       // 750
					default :                                                                                                  // 751
						throw new Error('mode:' + mode);                                                                          // 752
					}                                                                                                          // 753
				} else {                                                                                                    // 754
					throw new Error('type:' + type);                                                                           // 755
				}                                                                                                           // 756
			};                                                                                                           // 757
			_this.getLostPoint = function(qrcode) {                                                                      // 758
				var moduleCount = qrcode.getModuleCount();                                                                  // 759
				var lostPoint = 0;                                                                                          // 760
				// LEVEL1                                                                                                   // 761
				for (var row = 0; row < moduleCount; row += 1) {                                                            // 762
					for (var col = 0; col < moduleCount; col += 1) {                                                           // 763
						var sameCount = 0;                                                                                        // 764
						var dark = qrcode.isDark(row, col);                                                                       // 765
						for (var r = -1; r <= 1; r += 1) {                                                                        // 766
							if (row + r < 0 || moduleCount <= row + r) {                                                             // 767
								continue;                                                                                               // 768
							}                                                                                                        // 769
							for (var c = -1; c <= 1; c += 1) {                                                                       // 770
								if (col + c < 0 || moduleCount <= col + c) {                                                            // 771
									continue;                                                                                              // 772
								}                                                                                                       // 773
								if (r == 0 && c == 0) {                                                                                 // 774
									continue;                                                                                              // 775
								}                                                                                                       // 776
								if (dark == qrcode.isDark(row + r, col + c) ) {                                                         // 777
									sameCount += 1;                                                                                        // 778
								}                                                                                                       // 779
							}                                                                                                        // 780
						}                                                                                                         // 781
						if (sameCount > 5) {                                                                                      // 782
							lostPoint += (3 + sameCount - 5);                                                                        // 783
						}                                                                                                         // 784
					}                                                                                                          // 785
				};                                                                                                          // 786
				// LEVEL2                                                                                                   // 787
				for (var row = 0; row < moduleCount - 1; row += 1) {                                                        // 788
					for (var col = 0; col < moduleCount - 1; col += 1) {                                                       // 789
						var count = 0;                                                                                            // 790
						if (qrcode.isDark(row, col) ) count += 1;                                                                 // 791
						if (qrcode.isDark(row + 1, col) ) count += 1;                                                             // 792
						if (qrcode.isDark(row, col + 1) ) count += 1;                                                             // 793
						if (qrcode.isDark(row + 1, col + 1) ) count += 1;                                                         // 794
						if (count == 0 || count == 4) {                                                                           // 795
							lostPoint += 3;                                                                                          // 796
						}                                                                                                         // 797
					}                                                                                                          // 798
				}                                                                                                           // 799
				// LEVEL3                                                                                                   // 800
				for (var row = 0; row < moduleCount; row += 1) {                                                            // 801
					for (var col = 0; col < moduleCount - 6; col += 1) {                                                       // 802
						if (qrcode.isDark(row, col)                                                                               // 803
								&& !qrcode.isDark(row, col + 1)                                                                         // 804
								&&  qrcode.isDark(row, col + 2)                                                                         // 805
								&&  qrcode.isDark(row, col + 3)                                                                         // 806
								&&  qrcode.isDark(row, col + 4)                                                                         // 807
								&& !qrcode.isDark(row, col + 5)                                                                         // 808
								&&  qrcode.isDark(row, col + 6) ) {                                                                     // 809
							lostPoint += 40;                                                                                         // 810
						}                                                                                                         // 811
					}                                                                                                          // 812
				}                                                                                                           // 813
				for (var col = 0; col < moduleCount; col += 1) {                                                            // 814
					for (var row = 0; row < moduleCount - 6; row += 1) {                                                       // 815
						if (qrcode.isDark(row, col)                                                                               // 816
								&& !qrcode.isDark(row + 1, col)                                                                         // 817
								&&  qrcode.isDark(row + 2, col)                                                                         // 818
								&&  qrcode.isDark(row + 3, col)                                                                         // 819
								&&  qrcode.isDark(row + 4, col)                                                                         // 820
								&& !qrcode.isDark(row + 5, col)                                                                         // 821
								&&  qrcode.isDark(row + 6, col) ) {                                                                     // 822
							lostPoint += 40;                                                                                         // 823
						}                                                                                                         // 824
					}                                                                                                          // 825
				}                                                                                                           // 826
				// LEVEL4                                                                                                   // 827
				var darkCount = 0;                                                                                          // 828
				for (var col = 0; col < moduleCount; col += 1) {                                                            // 829
					for (var row = 0; row < moduleCount; row += 1) {                                                           // 830
						if (qrcode.isDark(row, col) ) {                                                                           // 831
							darkCount += 1;                                                                                          // 832
						}                                                                                                         // 833
					}                                                                                                          // 834
				}                                                                                                           // 835
				var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;                                 // 836
				lostPoint += ratio * 10;                                                                                    // 837
				return lostPoint;                                                                                           // 838
			};                                                                                                           // 839
			return _this;                                                                                                // 840
		}();                                                                                                          // 841
		//---------------------------------------------------------------------                                       // 842
		// QRMath                                                                                                     // 843
		//---------------------------------------------------------------------                                       // 844
		var QRMath = function() {                                                                                     // 845
			var EXP_TABLE = new Array(256);                                                                              // 846
			var LOG_TABLE = new Array(256);                                                                              // 847
			// initialize tables                                                                                         // 848
			for (var i = 0; i < 8; i += 1) {                                                                             // 849
				EXP_TABLE[i] = 1 << i;                                                                                      // 850
			}                                                                                                            // 851
			for (var i = 8; i < 256; i += 1) {                                                                           // 852
				EXP_TABLE[i] = EXP_TABLE[i - 4]                                                                             // 853
					^ EXP_TABLE[i - 5]                                                                                         // 854
					^ EXP_TABLE[i - 6]                                                                                         // 855
					^ EXP_TABLE[i - 8];                                                                                        // 856
			}                                                                                                            // 857
			for (var i = 0; i < 255; i += 1) {                                                                           // 858
				LOG_TABLE[EXP_TABLE[i] ] = i;                                                                               // 859
			}                                                                                                            // 860
			var _this = {};                                                                                              // 861
			_this.glog = function(n) {                                                                                   // 862
				if (n < 1) {                                                                                                // 863
					throw new Error('glog(' + n + ')');                                                                        // 864
				}                                                                                                           // 865
				return LOG_TABLE[n];                                                                                        // 866
			};                                                                                                           // 867
			_this.gexp = function(n) {                                                                                   // 868
				while (n < 0) {                                                                                             // 869
					n += 255;                                                                                                  // 870
				}                                                                                                           // 871
				while (n >= 256) {                                                                                          // 872
					n -= 255;                                                                                                  // 873
				}                                                                                                           // 874
				return EXP_TABLE[n];                                                                                        // 875
			};                                                                                                           // 876
			return _this;                                                                                                // 877
		}();                                                                                                          // 878
		//---------------------------------------------------------------------                                       // 879
		// qrPolynomial                                                                                               // 880
		//---------------------------------------------------------------------                                       // 881
		function qrPolynomial(num, shift) {                                                                           // 882
			if (typeof num.length == 'undefined') {                                                                      // 883
				throw new Error(num.length + '/' + shift);                                                                  // 884
			}                                                                                                            // 885
			var _num = function() {                                                                                      // 886
				var offset = 0;                                                                                             // 887
				while (offset < num.length && num[offset] == 0) {                                                           // 888
					offset += 1;                                                                                               // 889
				}                                                                                                           // 890
				var _num = new Array(num.length - offset + shift);                                                          // 891
				for (var i = 0; i < num.length - offset; i += 1) {                                                          // 892
					_num[i] = num[i + offset];                                                                                 // 893
				}                                                                                                           // 894
				return _num;                                                                                                // 895
			}();                                                                                                         // 896
			var _this = {};                                                                                              // 897
			_this.get = function(index) {                                                                                // 898
				return _num[index];                                                                                         // 899
			};                                                                                                           // 900
			_this.getLength = function() {                                                                               // 901
				return _num.length;                                                                                         // 902
			};                                                                                                           // 903
			_this.multiply = function(e) {                                                                               // 904
				var num = new Array(_this.getLength() + e.getLength() - 1);                                                 // 905
				for (var i = 0; i < _this.getLength(); i += 1) {                                                            // 906
					for (var j = 0; j < e.getLength(); j += 1) {                                                               // 907
						num[i + j] ^= QRMath.gexp(QRMath.glog(_this.get(i) ) + QRMath.glog(e.get(j) ) );                          // 908
					}                                                                                                          // 909
				}                                                                                                           // 910
				return qrPolynomial(num, 0);                                                                                // 911
			};                                                                                                           // 912
			_this.mod = function(e) {                                                                                    // 913
				if (_this.getLength() - e.getLength() < 0) {                                                                // 914
					return _this;                                                                                              // 915
				}                                                                                                           // 916
				var ratio = QRMath.glog(_this.get(0) ) - QRMath.glog(e.get(0) );                                            // 917
				var num = new Array(_this.getLength() );                                                                    // 918
				for (var i = 0; i < _this.getLength(); i += 1) {                                                            // 919
					num[i] = _this.get(i);                                                                                     // 920
				}                                                                                                           // 921
				for (var i = 0; i < e.getLength(); i += 1) {                                                                // 922
					num[i] ^= QRMath.gexp(QRMath.glog(e.get(i) ) + ratio);                                                     // 923
				}                                                                                                           // 924
				// recursive call                                                                                           // 925
				return qrPolynomial(num, 0).mod(e);                                                                         // 926
			};                                                                                                           // 927
			return _this;                                                                                                // 928
		};                                                                                                            // 929
		//---------------------------------------------------------------------                                       // 930
		// QRRSBlock                                                                                                  // 931
		//---------------------------------------------------------------------                                       // 932
		var QRRSBlock = function() {                                                                                  // 933
			var RS_BLOCK_TABLE = [                                                                                       // 934
				// L                                                                                                        // 935
				// M                                                                                                        // 936
				// Q                                                                                                        // 937
				// H                                                                                                        // 938
				// 1                                                                                                        // 939
				[1, 26, 19],                                                                                                // 940
				[1, 26, 16],                                                                                                // 941
				[1, 26, 13],                                                                                                // 942
				[1, 26, 9],                                                                                                 // 943
				// 2                                                                                                        // 944
				[1, 44, 34],                                                                                                // 945
				[1, 44, 28],                                                                                                // 946
				[1, 44, 22],                                                                                                // 947
				[1, 44, 16],                                                                                                // 948
				// 3                                                                                                        // 949
				[1, 70, 55],                                                                                                // 950
				[1, 70, 44],                                                                                                // 951
				[2, 35, 17],                                                                                                // 952
				[2, 35, 13],                                                                                                // 953
				// 4                                                                                                        // 954
				[1, 100, 80],                                                                                               // 955
				[2, 50, 32],                                                                                                // 956
				[2, 50, 24],                                                                                                // 957
				[4, 25, 9],                                                                                                 // 958
				// 5                                                                                                        // 959
				[1, 134, 108],                                                                                              // 960
				[2, 67, 43],                                                                                                // 961
				[2, 33, 15, 2, 34, 16],                                                                                     // 962
				[2, 33, 11, 2, 34, 12],                                                                                     // 963
				// 6                                                                                                        // 964
				[2, 86, 68],                                                                                                // 965
				[4, 43, 27],                                                                                                // 966
				[4, 43, 19],                                                                                                // 967
				[4, 43, 15],                                                                                                // 968
				// 7                                                                                                        // 969
				[2, 98, 78],                                                                                                // 970
				[4, 49, 31],                                                                                                // 971
				[2, 32, 14, 4, 33, 15],                                                                                     // 972
				[4, 39, 13, 1, 40, 14],                                                                                     // 973
				// 8                                                                                                        // 974
				[2, 121, 97],                                                                                               // 975
				[2, 60, 38, 2, 61, 39],                                                                                     // 976
				[4, 40, 18, 2, 41, 19],                                                                                     // 977
				[4, 40, 14, 2, 41, 15],                                                                                     // 978
				// 9                                                                                                        // 979
				[2, 146, 116],                                                                                              // 980
				[3, 58, 36, 2, 59, 37],                                                                                     // 981
				[4, 36, 16, 4, 37, 17],                                                                                     // 982
				[4, 36, 12, 4, 37, 13],                                                                                     // 983
				// 10                                                                                                       // 984
				[2, 86, 68, 2, 87, 69],                                                                                     // 985
				[4, 69, 43, 1, 70, 44],                                                                                     // 986
				[6, 43, 19, 2, 44, 20],                                                                                     // 987
				[6, 43, 15, 2, 44, 16],                                                                                     // 988
				// 11                                                                                                       // 989
				[4, 101, 81],                                                                                               // 990
				[1, 80, 50, 4, 81, 51],                                                                                     // 991
				[4, 50, 22, 4, 51, 23],                                                                                     // 992
				[3, 36, 12, 8, 37, 13],                                                                                     // 993
				// 12                                                                                                       // 994
				[2, 116, 92, 2, 117, 93],                                                                                   // 995
				[6, 58, 36, 2, 59, 37],                                                                                     // 996
				[4, 46, 20, 6, 47, 21],                                                                                     // 997
				[7, 42, 14, 4, 43, 15],                                                                                     // 998
				// 13                                                                                                       // 999
				[4, 133, 107],                                                                                              // 1000
				[8, 59, 37, 1, 60, 38],                                                                                     // 1001
				[8, 44, 20, 4, 45, 21],                                                                                     // 1002
				[12, 33, 11, 4, 34, 12],                                                                                    // 1003
				// 14                                                                                                       // 1004
				[3, 145, 115, 1, 146, 116],                                                                                 // 1005
				[4, 64, 40, 5, 65, 41],                                                                                     // 1006
				[11, 36, 16, 5, 37, 17],                                                                                    // 1007
				[11, 36, 12, 5, 37, 13],                                                                                    // 1008
				// 15                                                                                                       // 1009
				[5, 109, 87, 1, 110, 88],                                                                                   // 1010
				[5, 65, 41, 5, 66, 42],                                                                                     // 1011
				[5, 54, 24, 7, 55, 25],                                                                                     // 1012
				[11, 36, 12],                                                                                               // 1013
				// 16                                                                                                       // 1014
				[5, 122, 98, 1, 123, 99],                                                                                   // 1015
				[7, 73, 45, 3, 74, 46],                                                                                     // 1016
				[15, 43, 19, 2, 44, 20],                                                                                    // 1017
				[3, 45, 15, 13, 46, 16],                                                                                    // 1018
				// 17                                                                                                       // 1019
				[1, 135, 107, 5, 136, 108],                                                                                 // 1020
				[10, 74, 46, 1, 75, 47],                                                                                    // 1021
				[1, 50, 22, 15, 51, 23],                                                                                    // 1022
				[2, 42, 14, 17, 43, 15],                                                                                    // 1023
				// 18                                                                                                       // 1024
				[5, 150, 120, 1, 151, 121],                                                                                 // 1025
				[9, 69, 43, 4, 70, 44],                                                                                     // 1026
				[17, 50, 22, 1, 51, 23],                                                                                    // 1027
				[2, 42, 14, 19, 43, 15],                                                                                    // 1028
				// 19                                                                                                       // 1029
				[3, 141, 113, 4, 142, 114],                                                                                 // 1030
				[3, 70, 44, 11, 71, 45],                                                                                    // 1031
				[17, 47, 21, 4, 48, 22],                                                                                    // 1032
				[9, 39, 13, 16, 40, 14],                                                                                    // 1033
				// 20                                                                                                       // 1034
				[3, 135, 107, 5, 136, 108],                                                                                 // 1035
				[3, 67, 41, 13, 68, 42],                                                                                    // 1036
				[15, 54, 24, 5, 55, 25],                                                                                    // 1037
				[15, 43, 15, 10, 44, 16],                                                                                   // 1038
				// 21                                                                                                       // 1039
				[4, 144, 116, 4, 145, 117],                                                                                 // 1040
				[17, 68, 42],                                                                                               // 1041
				[17, 50, 22, 6, 51, 23],                                                                                    // 1042
				[19, 46, 16, 6, 47, 17],                                                                                    // 1043
				// 22                                                                                                       // 1044
				[2, 139, 111, 7, 140, 112],                                                                                 // 1045
				[17, 74, 46],                                                                                               // 1046
				[7, 54, 24, 16, 55, 25],                                                                                    // 1047
				[34, 37, 13],                                                                                               // 1048
				// 23                                                                                                       // 1049
				[4, 151, 121, 5, 152, 122],                                                                                 // 1050
				[4, 75, 47, 14, 76, 48],                                                                                    // 1051
				[11, 54, 24, 14, 55, 25],                                                                                   // 1052
				[16, 45, 15, 14, 46, 16],                                                                                   // 1053
				// 24                                                                                                       // 1054
				[6, 147, 117, 4, 148, 118],                                                                                 // 1055
				[6, 73, 45, 14, 74, 46],                                                                                    // 1056
				[11, 54, 24, 16, 55, 25],                                                                                   // 1057
				[30, 46, 16, 2, 47, 17],                                                                                    // 1058
				// 25                                                                                                       // 1059
				[8, 132, 106, 4, 133, 107],                                                                                 // 1060
				[8, 75, 47, 13, 76, 48],                                                                                    // 1061
				[7, 54, 24, 22, 55, 25],                                                                                    // 1062
				[22, 45, 15, 13, 46, 16],                                                                                   // 1063
				// 26                                                                                                       // 1064
				[10, 142, 114, 2, 143, 115],                                                                                // 1065
				[19, 74, 46, 4, 75, 47],                                                                                    // 1066
				[28, 50, 22, 6, 51, 23],                                                                                    // 1067
				[33, 46, 16, 4, 47, 17],                                                                                    // 1068
				// 27                                                                                                       // 1069
				[8, 152, 122, 4, 153, 123],                                                                                 // 1070
				[22, 73, 45, 3, 74, 46],                                                                                    // 1071
				[8, 53, 23, 26, 54, 24],                                                                                    // 1072
				[12, 45, 15, 28, 46, 16],                                                                                   // 1073
				// 28                                                                                                       // 1074
				[3, 147, 117, 10, 148, 118],                                                                                // 1075
				[3, 73, 45, 23, 74, 46],                                                                                    // 1076
				[4, 54, 24, 31, 55, 25],                                                                                    // 1077
				[11, 45, 15, 31, 46, 16],                                                                                   // 1078
				// 29                                                                                                       // 1079
				[7, 146, 116, 7, 147, 117],                                                                                 // 1080
				[21, 73, 45, 7, 74, 46],                                                                                    // 1081
				[1, 53, 23, 37, 54, 24],                                                                                    // 1082
				[19, 45, 15, 26, 46, 16],                                                                                   // 1083
				// 30                                                                                                       // 1084
				[5, 145, 115, 10, 146, 116],                                                                                // 1085
				[19, 75, 47, 10, 76, 48],                                                                                   // 1086
				[15, 54, 24, 25, 55, 25],                                                                                   // 1087
				[23, 45, 15, 25, 46, 16],                                                                                   // 1088
				// 31                                                                                                       // 1089
				[13, 145, 115, 3, 146, 116],                                                                                // 1090
				[2, 74, 46, 29, 75, 47],                                                                                    // 1091
				[42, 54, 24, 1, 55, 25],                                                                                    // 1092
				[23, 45, 15, 28, 46, 16],                                                                                   // 1093
				// 32                                                                                                       // 1094
				[17, 145, 115],                                                                                             // 1095
				[10, 74, 46, 23, 75, 47],                                                                                   // 1096
				[10, 54, 24, 35, 55, 25],                                                                                   // 1097
				[19, 45, 15, 35, 46, 16],                                                                                   // 1098
				// 33                                                                                                       // 1099
				[17, 145, 115, 1, 146, 116],                                                                                // 1100
				[14, 74, 46, 21, 75, 47],                                                                                   // 1101
				[29, 54, 24, 19, 55, 25],                                                                                   // 1102
				[11, 45, 15, 46, 46, 16],                                                                                   // 1103
				// 34                                                                                                       // 1104
				[13, 145, 115, 6, 146, 116],                                                                                // 1105
				[14, 74, 46, 23, 75, 47],                                                                                   // 1106
				[44, 54, 24, 7, 55, 25],                                                                                    // 1107
				[59, 46, 16, 1, 47, 17],                                                                                    // 1108
				// 35                                                                                                       // 1109
				[12, 151, 121, 7, 152, 122],                                                                                // 1110
				[12, 75, 47, 26, 76, 48],                                                                                   // 1111
				[39, 54, 24, 14, 55, 25],                                                                                   // 1112
				[22, 45, 15, 41, 46, 16],                                                                                   // 1113
				// 36                                                                                                       // 1114
				[6, 151, 121, 14, 152, 122],                                                                                // 1115
				[6, 75, 47, 34, 76, 48],                                                                                    // 1116
				[46, 54, 24, 10, 55, 25],                                                                                   // 1117
				[2, 45, 15, 64, 46, 16],                                                                                    // 1118
				// 37                                                                                                       // 1119
				[17, 152, 122, 4, 153, 123],                                                                                // 1120
				[29, 74, 46, 14, 75, 47],                                                                                   // 1121
				[49, 54, 24, 10, 55, 25],                                                                                   // 1122
				[24, 45, 15, 46, 46, 16],                                                                                   // 1123
				// 38                                                                                                       // 1124
				[4, 152, 122, 18, 153, 123],                                                                                // 1125
				[13, 74, 46, 32, 75, 47],                                                                                   // 1126
				[48, 54, 24, 14, 55, 25],                                                                                   // 1127
				[42, 45, 15, 32, 46, 16],                                                                                   // 1128
				// 39                                                                                                       // 1129
				[20, 147, 117, 4, 148, 118],                                                                                // 1130
				[40, 75, 47, 7, 76, 48],                                                                                    // 1131
				[43, 54, 24, 22, 55, 25],                                                                                   // 1132
				[10, 45, 15, 67, 46, 16],                                                                                   // 1133
				// 40                                                                                                       // 1134
				[19, 148, 118, 6, 149, 119],                                                                                // 1135
				[18, 75, 47, 31, 76, 48],                                                                                   // 1136
				[34, 54, 24, 34, 55, 25],                                                                                   // 1137
				[20, 45, 15, 61, 46, 16]                                                                                    // 1138
			];                                                                                                           // 1139
			var qrRSBlock = function(totalCount, dataCount) {                                                            // 1140
				var _this = {};                                                                                             // 1141
				_this.totalCount = totalCount;                                                                              // 1142
				_this.dataCount = dataCount;                                                                                // 1143
				return _this;                                                                                               // 1144
			};                                                                                                           // 1145
			var _this = {};                                                                                              // 1146
			var getRsBlockTable = function(typeNumber, errorCorrectLevel) {                                              // 1147
				switch(errorCorrectLevel) {                                                                                 // 1148
				case QRErrorCorrectLevel.L :                                                                                // 1149
					return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];                                                           // 1150
				case QRErrorCorrectLevel.M :                                                                                // 1151
					return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];                                                           // 1152
				case QRErrorCorrectLevel.Q :                                                                                // 1153
					return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];                                                           // 1154
				case QRErrorCorrectLevel.H :                                                                                // 1155
					return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];                                                           // 1156
				default :                                                                                                   // 1157
					return undefined;                                                                                          // 1158
				}                                                                                                           // 1159
			};                                                                                                           // 1160
			_this.getRSBlocks = function(typeNumber, errorCorrectLevel) {                                                // 1161
				var rsBlock = getRsBlockTable(typeNumber, errorCorrectLevel);                                               // 1162
				if (typeof rsBlock == 'undefined') {                                                                        // 1163
					throw new Error('bad rs block @ typeNumber:' + typeNumber +                                                // 1164
							'/errorCorrectLevel:' + errorCorrectLevel);                                                              // 1165
				}                                                                                                           // 1166
				var length = rsBlock.length / 3;                                                                            // 1167
				var list = new Array();                                                                                     // 1168
				for (var i = 0; i < length; i += 1) {                                                                       // 1169
					var count = rsBlock[i * 3 + 0];                                                                            // 1170
					var totalCount = rsBlock[i * 3 + 1];                                                                       // 1171
					var dataCount = rsBlock[i * 3 + 2];                                                                        // 1172
					for (var j = 0; j < count; j += 1) {                                                                       // 1173
						list.push(qrRSBlock(totalCount, dataCount) );                                                             // 1174
					}                                                                                                          // 1175
				}                                                                                                           // 1176
				return list;                                                                                                // 1177
			};                                                                                                           // 1178
			return _this;                                                                                                // 1179
		}();                                                                                                          // 1180
		//---------------------------------------------------------------------                                       // 1181
		// qrBitBuffer                                                                                                // 1182
		//---------------------------------------------------------------------                                       // 1183
		var qrBitBuffer = function() {                                                                                // 1184
			var _buffer = new Array();                                                                                   // 1185
			var _length = 0;                                                                                             // 1186
			var _this = {};                                                                                              // 1187
			_this.getBuffer = function() {                                                                               // 1188
				return _buffer;                                                                                             // 1189
			};                                                                                                           // 1190
			_this.get = function(index) {                                                                                // 1191
				var bufIndex = Math.floor(index / 8);                                                                       // 1192
				return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;                                                // 1193
			};                                                                                                           // 1194
			_this.put = function(num, length) {                                                                          // 1195
				for (var i = 0; i < length; i += 1) {                                                                       // 1196
					_this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);                                                    // 1197
				}                                                                                                           // 1198
			};                                                                                                           // 1199
			_this.getLengthInBits = function() {                                                                         // 1200
				return _length;                                                                                             // 1201
			};                                                                                                           // 1202
			_this.putBit = function(bit) {                                                                               // 1203
				var bufIndex = Math.floor(_length / 8);                                                                     // 1204
				if (_buffer.length <= bufIndex) {                                                                           // 1205
					_buffer.push(0);                                                                                           // 1206
				}                                                                                                           // 1207
				if (bit) {                                                                                                  // 1208
					_buffer[bufIndex] |= (0x80 >>> (_length % 8) );                                                            // 1209
				}                                                                                                           // 1210
				_length += 1;                                                                                               // 1211
			};                                                                                                           // 1212
			return _this;                                                                                                // 1213
		};                                                                                                            // 1214
		//---------------------------------------------------------------------                                       // 1215
		// qr8BitByte                                                                                                 // 1216
		//---------------------------------------------------------------------                                       // 1217
		var qr8BitByte = function(data) {                                                                             // 1218
			var _mode = QRMode.MODE_8BIT_BYTE;                                                                           // 1219
			var _data = data;                                                                                            // 1220
			var _bytes = qrcode.stringToBytes(data);                                                                     // 1221
			var _this = {};                                                                                              // 1222
			_this.getMode = function() {                                                                                 // 1223
				return _mode;                                                                                               // 1224
			};                                                                                                           // 1225
			_this.getLength = function(buffer) {                                                                         // 1226
				return _bytes.length;                                                                                       // 1227
			};                                                                                                           // 1228
			_this.write = function(buffer) {                                                                             // 1229
				for (var i = 0; i < _bytes.length; i += 1) {                                                                // 1230
					buffer.put(_bytes[i], 8);                                                                                  // 1231
				}                                                                                                           // 1232
			};                                                                                                           // 1233
			return _this;                                                                                                // 1234
		};                                                                                                            // 1235
		//=====================================================================                                       // 1236
		// GIF Support etc.                                                                                           // 1237
		//                                                                                                            // 1238
		//---------------------------------------------------------------------                                       // 1239
		// byteArrayOutputStream                                                                                      // 1240
		//---------------------------------------------------------------------                                       // 1241
		var byteArrayOutputStream = function() {                                                                      // 1242
			var _bytes = new Array();                                                                                    // 1243
			var _this = {};                                                                                              // 1244
			_this.writeByte = function(b) {                                                                              // 1245
				_bytes.push(b & 0xff);                                                                                      // 1246
			};                                                                                                           // 1247
			_this.writeShort = function(i) {                                                                             // 1248
				_this.writeByte(i);                                                                                         // 1249
				_this.writeByte(i >>> 8);                                                                                   // 1250
			};                                                                                                           // 1251
			_this.writeBytes = function(b, off, len) {                                                                   // 1252
				off = off || 0;                                                                                             // 1253
				len = len || b.length;                                                                                      // 1254
				for (var i = 0; i < len; i += 1) {                                                                          // 1255
					_this.writeByte(b[i + off]);                                                                               // 1256
				}                                                                                                           // 1257
			};                                                                                                           // 1258
			_this.writeString = function(s) {                                                                            // 1259
				for (var i = 0; i < s.length; i += 1) {                                                                     // 1260
					_this.writeByte(s.charCodeAt(i) );                                                                         // 1261
				}                                                                                                           // 1262
			};                                                                                                           // 1263
			_this.toByteArray = function() {                                                                             // 1264
				return _bytes;                                                                                              // 1265
			};                                                                                                           // 1266
			_this.toString = function() {                                                                                // 1267
				var s = '';                                                                                                 // 1268
				s += '[';                                                                                                   // 1269
				for (var i = 0; i < _bytes.length; i += 1) {                                                                // 1270
					if (i > 0) {                                                                                               // 1271
						s += ',';                                                                                                 // 1272
					}                                                                                                          // 1273
					s += _bytes[i];                                                                                            // 1274
				}                                                                                                           // 1275
				s += ']';                                                                                                   // 1276
				return s;                                                                                                   // 1277
			};                                                                                                           // 1278
			return _this;                                                                                                // 1279
		};                                                                                                            // 1280
		//---------------------------------------------------------------------                                       // 1281
		// base64EncodeOutputStream                                                                                   // 1282
		//---------------------------------------------------------------------                                       // 1283
		var base64EncodeOutputStream = function() {                                                                   // 1284
			var _buffer = 0;                                                                                             // 1285
			var _buflen = 0;                                                                                             // 1286
			var _length = 0;                                                                                             // 1287
			var _base64 = '';                                                                                            // 1288
			var _this = {};                                                                                              // 1289
			var writeEncoded = function(b) {                                                                             // 1290
				_base64 += String.fromCharCode(encode(b & 0x3f) );                                                          // 1291
			};                                                                                                           // 1292
			var encode = function(n) {                                                                                   // 1293
				if (n < 0) {                                                                                                // 1294
					// error.                                                                                                  // 1295
				} else if (n < 26) {                                                                                        // 1296
					return 0x41 + n;                                                                                           // 1297
				} else if (n < 52) {                                                                                        // 1298
					return 0x61 + (n - 26);                                                                                    // 1299
				} else if (n < 62) {                                                                                        // 1300
					return 0x30 + (n - 52);                                                                                    // 1301
				} else if (n == 62) {                                                                                       // 1302
					return 0x2b;                                                                                               // 1303
				} else if (n == 63) {                                                                                       // 1304
					return 0x2f;                                                                                               // 1305
				}                                                                                                           // 1306
				throw new Error('n:' + n);                                                                                  // 1307
			};                                                                                                           // 1308
			_this.writeByte = function(n) {                                                                              // 1309
				_buffer = (_buffer << 8) | (n & 0xff);                                                                      // 1310
				_buflen += 8;                                                                                               // 1311
				_length += 1;                                                                                               // 1312
				while (_buflen >= 6) {                                                                                      // 1313
					writeEncoded(_buffer >>> (_buflen - 6) );                                                                  // 1314
					_buflen -= 6;                                                                                              // 1315
				}                                                                                                           // 1316
			};                                                                                                           // 1317
			_this.flush = function() {                                                                                   // 1318
				if (_buflen > 0) {                                                                                          // 1319
					writeEncoded(_buffer << (6 - _buflen) );                                                                   // 1320
					_buffer = 0;                                                                                               // 1321
					_buflen = 0;                                                                                               // 1322
				}                                                                                                           // 1323
				if (_length % 3 != 0) {                                                                                     // 1324
					// padding                                                                                                 // 1325
					var padlen = 3 - _length % 3;                                                                              // 1326
					for (var i = 0; i < padlen; i += 1) {                                                                      // 1327
						_base64 += '=';                                                                                           // 1328
					}                                                                                                          // 1329
				}                                                                                                           // 1330
			};                                                                                                           // 1331
			_this.toString = function() {                                                                                // 1332
				return _base64;                                                                                             // 1333
			};                                                                                                           // 1334
			return _this;                                                                                                // 1335
		};                                                                                                            // 1336
		//---------------------------------------------------------------------                                       // 1337
		// base64DecodeInputStream                                                                                    // 1338
		//---------------------------------------------------------------------                                       // 1339
		var base64DecodeInputStream = function(str) {                                                                 // 1340
			var _str = str;                                                                                              // 1341
			var _pos = 0;                                                                                                // 1342
			var _buffer = 0;                                                                                             // 1343
			var _buflen = 0;                                                                                             // 1344
			var _this = {};                                                                                              // 1345
			_this.read = function() {                                                                                    // 1346
				while (_buflen < 8) {                                                                                       // 1347
					if (_pos >= _str.length) {                                                                                 // 1348
						if (_buflen == 0) {                                                                                       // 1349
							return -1;                                                                                               // 1350
						}                                                                                                         // 1351
						throw new Error('unexpected end of file./' + _buflen);                                                    // 1352
					}                                                                                                          // 1353
					var c = _str.charAt(_pos);                                                                                 // 1354
					_pos += 1;                                                                                                 // 1355
					if (c == '=') {                                                                                            // 1356
						_buflen = 0;                                                                                              // 1357
						return -1;                                                                                                // 1358
					} else if (c.match(/^\s$/) ) {                                                                             // 1359
						// ignore if whitespace.                                                                                  // 1360
						continue;                                                                                                 // 1361
					}                                                                                                          // 1362
					_buffer = (_buffer << 6) | decode(c.charCodeAt(0) );                                                       // 1363
					_buflen += 6;                                                                                              // 1364
				}                                                                                                           // 1365
				var n = (_buffer >>> (_buflen - 8) ) & 0xff;                                                                // 1366
				_buflen -= 8;                                                                                               // 1367
				return n;                                                                                                   // 1368
			};                                                                                                           // 1369
			var decode = function(c) {                                                                                   // 1370
				if (0x41 <= c && c <= 0x5a) {                                                                               // 1371
					return c - 0x41;                                                                                           // 1372
				} else if (0x61 <= c && c <= 0x7a) {                                                                        // 1373
					return c - 0x61 + 26;                                                                                      // 1374
				} else if (0x30 <= c && c <= 0x39) {                                                                        // 1375
					return c - 0x30 + 52;                                                                                      // 1376
				} else if (c == 0x2b) {                                                                                     // 1377
					return 62;                                                                                                 // 1378
				} else if (c == 0x2f) {                                                                                     // 1379
					return 63;                                                                                                 // 1380
				} else {                                                                                                    // 1381
					throw new Error('c:' + c);                                                                                 // 1382
				}                                                                                                           // 1383
			};                                                                                                           // 1384
			return _this;                                                                                                // 1385
		};                                                                                                            // 1386
		//---------------------------------------------------------------------                                       // 1387
		// gifImage (B/W)                                                                                             // 1388
		//---------------------------------------------------------------------                                       // 1389
		var gifImage = function(width, height) {                                                                      // 1390
			var _width = width;                                                                                          // 1391
			var _height = height;                                                                                        // 1392
			var _data = new Array(width * height);                                                                       // 1393
			var _this = {};                                                                                              // 1394
			_this.setPixel = function(x, y, pixel) {                                                                     // 1395
				_data[y * _width + x] = pixel;                                                                              // 1396
			};                                                                                                           // 1397
			_this.write = function(out) {                                                                                // 1398
				//---------------------------------                                                                         // 1399
				// GIF Signature                                                                                            // 1400
				out.writeString('GIF87a');                                                                                  // 1401
				//---------------------------------                                                                         // 1402
				// Screen Descriptor                                                                                        // 1403
				out.writeShort(_width);                                                                                     // 1404
				out.writeShort(_height);                                                                                    // 1405
				out.writeByte(0x80); // 2bit                                                                                // 1406
				out.writeByte(0);                                                                                           // 1407
				out.writeByte(0);                                                                                           // 1408
				//---------------------------------                                                                         // 1409
				// Global Color Map                                                                                         // 1410
				// black                                                                                                    // 1411
				out.writeByte(0x00);                                                                                        // 1412
				out.writeByte(0x00);                                                                                        // 1413
				out.writeByte(0x00);                                                                                        // 1414
				// white                                                                                                    // 1415
				out.writeByte(0xff);                                                                                        // 1416
				out.writeByte(0xff);                                                                                        // 1417
				out.writeByte(0xff);                                                                                        // 1418
				//---------------------------------                                                                         // 1419
				// Image Descriptor                                                                                         // 1420
				out.writeString(',');                                                                                       // 1421
				out.writeShort(0);                                                                                          // 1422
				out.writeShort(0);                                                                                          // 1423
				out.writeShort(_width);                                                                                     // 1424
				out.writeShort(_height);                                                                                    // 1425
				out.writeByte(0);                                                                                           // 1426
				//---------------------------------                                                                         // 1427
				// Local Color Map                                                                                          // 1428
				//---------------------------------                                                                         // 1429
				// Raster Data                                                                                              // 1430
				var lzwMinCodeSize = 2;                                                                                     // 1431
				var raster = getLZWRaster(lzwMinCodeSize);                                                                  // 1432
				out.writeByte(lzwMinCodeSize);                                                                              // 1433
				var offset = 0;                                                                                             // 1434
				while (raster.length - offset > 255) {                                                                      // 1435
					out.writeByte(255);                                                                                        // 1436
					out.writeBytes(raster, offset, 255);                                                                       // 1437
					offset += 255;                                                                                             // 1438
				}                                                                                                           // 1439
				out.writeByte(raster.length - offset);                                                                      // 1440
				out.writeBytes(raster, offset, raster.length - offset);                                                     // 1441
				out.writeByte(0x00);                                                                                        // 1442
				//---------------------------------                                                                         // 1443
				// GIF Terminator                                                                                           // 1444
				out.writeString(';');                                                                                       // 1445
			};                                                                                                           // 1446
			var bitOutputStream = function(out) {                                                                        // 1447
				var _out = out;                                                                                             // 1448
				var _bitLength = 0;                                                                                         // 1449
				var _bitBuffer = 0;                                                                                         // 1450
				var _this = {};                                                                                             // 1451
				_this.write = function(data, length) {                                                                      // 1452
					if ( (data >>> length) != 0) {                                                                             // 1453
						throw new Error('length over');                                                                           // 1454
					}                                                                                                          // 1455
					while (_bitLength + length >= 8) {                                                                         // 1456
						_out.writeByte(0xff & ( (data << _bitLength) | _bitBuffer) );                                             // 1457
						length -= (8 - _bitLength);                                                                               // 1458
						data >>>= (8 - _bitLength);                                                                               // 1459
						_bitBuffer = 0;                                                                                           // 1460
						_bitLength = 0;                                                                                           // 1461
					}                                                                                                          // 1462
					_bitBuffer = (data << _bitLength) | _bitBuffer;                                                            // 1463
					_bitLength = _bitLength + length;                                                                          // 1464
				};                                                                                                          // 1465
				_this.flush = function() {                                                                                  // 1466
					if (_bitLength > 0) {                                                                                      // 1467
						_out.writeByte(_bitBuffer);                                                                               // 1468
					}                                                                                                          // 1469
				};                                                                                                          // 1470
				return _this;                                                                                               // 1471
			};                                                                                                           // 1472
			var getLZWRaster = function(lzwMinCodeSize) {                                                                // 1473
				var clearCode = 1 << lzwMinCodeSize;                                                                        // 1474
				var endCode = (1 << lzwMinCodeSize) + 1;                                                                    // 1475
				var bitLength = lzwMinCodeSize + 1;                                                                         // 1476
				// Setup LZWTable                                                                                           // 1477
				var table = lzwTable();                                                                                     // 1478
				for (var i = 0; i < clearCode; i += 1) {                                                                    // 1479
					table.add(String.fromCharCode(i) );                                                                        // 1480
				}                                                                                                           // 1481
				table.add(String.fromCharCode(clearCode) );                                                                 // 1482
				table.add(String.fromCharCode(endCode) );                                                                   // 1483
				var byteOut = byteArrayOutputStream();                                                                      // 1484
				var bitOut = bitOutputStream(byteOut);                                                                      // 1485
				// clear code                                                                                               // 1486
				bitOut.write(clearCode, bitLength);                                                                         // 1487
				var dataIndex = 0;                                                                                          // 1488
				var s = String.fromCharCode(_data[dataIndex]);                                                              // 1489
				dataIndex += 1;                                                                                             // 1490
				while (dataIndex < _data.length) {                                                                          // 1491
					var c = String.fromCharCode(_data[dataIndex]);                                                             // 1492
					dataIndex += 1;                                                                                            // 1493
					if (table.contains(s + c) ) {                                                                              // 1494
						s = s + c;                                                                                                // 1495
					} else {                                                                                                   // 1496
						bitOut.write(table.indexOf(s), bitLength);                                                                // 1497
						if (table.size() < 0xfff) {                                                                               // 1498
							if (table.size() == (1 << bitLength) ) {                                                                 // 1499
								bitLength += 1;                                                                                         // 1500
							}                                                                                                        // 1501
							table.add(s + c);                                                                                        // 1502
						}                                                                                                         // 1503
						s = c;                                                                                                    // 1504
					}                                                                                                          // 1505
				}                                                                                                           // 1506
				bitOut.write(table.indexOf(s), bitLength);                                                                  // 1507
				// end code                                                                                                 // 1508
				bitOut.write(endCode, bitLength);                                                                           // 1509
				bitOut.flush();                                                                                             // 1510
				return byteOut.toByteArray();                                                                               // 1511
			};                                                                                                           // 1512
			var lzwTable = function() {                                                                                  // 1513
				var _map = {};                                                                                              // 1514
				var _size = 0;                                                                                              // 1515
				var _this = {};                                                                                             // 1516
				_this.add = function(key) {                                                                                 // 1517
					if (_this.contains(key) ) {                                                                                // 1518
						throw new Error('dup key:' + key);                                                                        // 1519
					}                                                                                                          // 1520
					_map[key] = _size;                                                                                         // 1521
					_size += 1;                                                                                                // 1522
				};                                                                                                          // 1523
				_this.size = function() {                                                                                   // 1524
					return _size;                                                                                              // 1525
				};                                                                                                          // 1526
				_this.indexOf = function(key) {                                                                             // 1527
					return _map[key];                                                                                          // 1528
				};                                                                                                          // 1529
				_this.contains = function(key) {                                                                            // 1530
					return typeof _map[key] != 'undefined';                                                                    // 1531
				};                                                                                                          // 1532
				return _this;                                                                                               // 1533
			};                                                                                                           // 1534
			return _this;                                                                                                // 1535
		};                                                                                                            // 1536
		var createImgTag = function(width, height, getPixel, alt) {                                                   // 1537
			var gif = gifImage(width, height);                                                                           // 1538
			for (var y = 0; y < height; y += 1) {                                                                        // 1539
				for (var x = 0; x < width; x += 1) {                                                                        // 1540
					gif.setPixel(x, y, getPixel(x, y) );                                                                       // 1541
				}                                                                                                           // 1542
			}                                                                                                            // 1543
			var b = byteArrayOutputStream();                                                                             // 1544
			gif.write(b);                                                                                                // 1545
			var base64 = base64EncodeOutputStream();                                                                     // 1546
			var bytes = b.toByteArray();                                                                                 // 1547
			for (var i = 0; i < bytes.length; i += 1) {                                                                  // 1548
				base64.writeByte(bytes[i]);                                                                                 // 1549
			}                                                                                                            // 1550
			base64.flush();                                                                                              // 1551
			var img = '';                                                                                                // 1552
			img += '<img';                                                                                               // 1553
			img += '\u0020src="';                                                                                        // 1554
			img += 'data:image/gif;base64,';                                                                             // 1555
			img += base64;                                                                                               // 1556
			img += '"';                                                                                                  // 1557
			img += '\u0020width="';                                                                                      // 1558
			img += width;                                                                                                // 1559
			img += '"';                                                                                                  // 1560
			img += '\u0020height="';                                                                                     // 1561
			img += height;                                                                                               // 1562
			img += '"';                                                                                                  // 1563
			if (alt) {                                                                                                   // 1564
				img += '\u0020alt="';                                                                                       // 1565
				img += alt;                                                                                                 // 1566
				img += '"';                                                                                                 // 1567
			}                                                                                                            // 1568
			img += '/>';                                                                                                 // 1569
			return img;                                                                                                  // 1570
		};                                                                                                            // 1571
		//---------------------------------------------------------------------                                       // 1572
		// returns qrcode function.                                                                                   // 1573
		return qrcode;                                                                                                // 1574
	}();                                                                                                           // 1575
                                                                                                                 // 1576
}(jQuery));                                                                                                      // 1577
                                                                                                                 // 1578
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("steeve:jquery-qrcode");

})();
