// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var URL = "https://script.google.com/macros/s/AKfycbx0GSLbskHs630bOv2Owxs4XOt3XQTqSo0644SddRj46nnOP2806WnoYxmeGZfEKaV7/exec";
var dsnguoivao = document.querySelector(".dsnguoivao");
var btnThemNg = document.getElementById("btnAdd");
var btnguidk = document.getElementById("btnguidk");
var btnkiemtra = document.getElementById("btnkiemtra");
var listItems = document.querySelectorAll(".menu li");
var modal = document.getElementById("dangchay");
var dsns = [];
var stt = 1;
var idnguoidk = document.getElementById("idngdk");
var idhotendk = document.getElementById("idhotendk");
var idbophan = document.getElementById("idbophan");
var idchucvu = document.getElementById("idchucvu");
var idtungay = document.getElementById("idtungay");
var iddenngay = document.getElementById("iddenngay");
var idtuthgian = document.getElementById("idtuthgian");
var iddenthgian = document.getElementById("iddenthgian");
var idlydo = document.getElementById("idlydo");
var idghichu = document.getElementById("idghichu");
var idquanly = document.getElementById("quanly");
listItems.forEach(function (item) {
  item.addEventListener("click", function () {
    var pgname = this.getAttribute("value");
    var pgclick = document.getElementById(pgname);
    if (pgclick !== null) {
      listItems.forEach(function (li) {
        // Xóa class 'selected' khỏi tất cả các mục <li> khác
        li.classList.remove("active");
        var pgname = li.getAttribute("value");
        var pg = document.getElementById(pgname);
        try {
          pg.classList.add("hidden");
        } catch (_unused) {}
      });
      // Thêm class 'selected' cho mục <li> vừa nhấp vào
      pgclick.classList.remove("hidden");
      this.classList.add("active");
      if (pgname === "pgdangky") {
        fetchDs();
      }
    }
  });
});
function fetchDs() {
  if (dsns.length === 0) {
    var submitData = {
      type: "dangky"
    };
    console.log("đang lấy danh sách nhân sự");
    modal.classList.add("display");
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(submitData) // p data type must match "Content-Type" header
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      dsns = _toConsumableArray(data);
      modal.classList.remove("display");
    }).catch(function (error) {
      console.error("Error:", error);
      modal.classList.remove("display");
      alert("Không tìm thấy cơ sở dữ liệu nhân sự, vui lòng kiểm tra lại");
    });
  }
}
btnThemNg.addEventListener("click", function (e) {
  e.preventDefault();
  var donvi = document.querySelectorAll(".DVcongTac");
  var dvi = donvi[donvi.length - 1].value;
  stt += 1;
  var temporaryDiv = document.createElement("div");
  var innerEle = "<input style=\"width:18px;border: none;padding-top:10px\" value=\"".concat(stt, "/\" class=\"soTT Ng").concat(stt, "\" readonly></input>\n  <input class=\"soCCCD Ng").concat(stt, "\" type=\"text\" style=\"width:108px; margin-bottom:2px\" placeholder=\"S\u1ED1 CCCD\"></input>\n  <input class=\"HoVaTen Ng").concat(stt, "\" type=\"text\" style=\"width:210px; margin-bottom:2px\" placeholder=\"H\u1ECD v\xE0 t\xEAn\"></input>\n  <button id= \"Ng").concat(stt, "\" class=\"btnXoa Ng").concat(stt, "\" style=\"width:21px;background-color:red;font-weight: ;\">X</button>\n  <br class=\"Ng").concat(stt, "\">\n  <input class=\"SoDT Ng").concat(stt, "\" type=\"text\" style=\"width:108px; margin-bottom:2px;margin-left: 25px\" placeholder=\"S\u1ED1 \u0111i\u1EC7n tho\u1EA1i\"></input>\n  <input class=\"DVcongTac Ng").concat(stt, "\" type=\"text\" style=\"width:235px; margin-bottom:2px\" placeholder=\"\u0110\u01A1n v\u1ECB c\xF4ng t\xE1c\" Value=\"").concat(dvi, "\"></input>\n  <br class=\"Ng").concat(stt, "\">");
  temporaryDiv.innerHTML = innerEle;
  while (temporaryDiv.firstChild) {
    dsnguoivao.appendChild(temporaryDiv.firstChild);
  }
  var dsbtnXoa = document.querySelectorAll(".btnXoa");
  lay_lai_tt();
  dsbtnXoa.forEach(function (btnXoa) {
    btnXoa.addEventListener("click", function (e) {
      e.preventDefault();
      var tt = btnXoa.getAttribute("id");
      var dsinput = document.querySelectorAll(".".concat(tt));
      dsinput.forEach(function (elem) {
        dsnguoivao.removeChild(elem);
        lay_lai_tt();
      });
    });
  });
});
function lay_lai_tt() {
  var dsSoTT = document.querySelectorAll(".soTT");
  for (var i = 0; i < dsSoTT.length; i++) {
    dsSoTT[i].value = "".concat(i + 1, "/");
  }
}
idnguoidk.addEventListener("input", function (e) {
  idnguoidk.value = idnguoidk.value.toUpperCase();
  // idquanly.value = "";
  if (idnguoidk.value.length >= 7) {
    var nv = dsns.find(function (nv) {
      return nv.MaNV.toLowerCase() === idnguoidk.value.toLowerCase();
    });
    if (!nv) {
      idhotendk.value = "không tìm thấy";
      idhotendk.classList.add("fal");
      idhotendk.classList.remove("done");
      idbophan.value = "";
      idchucvu.value = "";
    } else {
      idhotendk.classList.remove("fal");
      idhotendk.classList.add("done");
      idhotendk.value = nv.HoTen;
      idbophan.value = nv.BoPhan;
      idchucvu.value = nv.ChucVu;
      var dsql = [];
      dsql = dsns.filter(function (rs) {
        return (
          // rs.BoPhan.toLowerCase() === idbophan.value.toLowerCase() &&
          rs.CapDuyet.toLowerCase() === "trưởng bộ phận" || rs.CapDuyet.toLowerCase() === "phó phòng"
        );
      });
      if (dsql.length > 0) {
        // var innerSelect = `<label>Quản lý xác nhận:</label>
        // <select id="quanly" style="font-size:16px; height: 25px;">`;
        var innerSelect = "<option value=\"\">- Ch\u1ECDn qu\u1EA3n l\xFD x\xE1c nh\u1EADn -</option>";
        dsql.forEach(function (rs) {
          return innerSelect += "<option value =\"".concat(rs.HoTen, "|").concat(rs.BoPhan, "\">[").concat(rs.BoPhan, "] ").concat(rs.HoTen, "</option>");
        });
        // innerSelect += `</select>`;
        idquanly.innerHTML = innerSelect;
      } else {
        idquanly.innerHTML = "";
      }
    }
  } else {
    idhotendk.value = "";
    idbophan.value = "";
    idchucvu.value = "";
  }
});
btnguidk.addEventListener("click", function (e) {
  e.preventDefault();
  var cccd = document.querySelectorAll(".soCCCD");
  var hoten = document.querySelectorAll(".HoVaTen");
  var dt = document.querySelectorAll(".SoDT");
  var donvi = document.querySelectorAll(".DVcongTac");
  var dsdangky = [];
  var checkinput = "true";
  for (var i = 0; i < cccd.length; i++) {
    var socccd = cccd[i].value;
    var hovaten = hoten[i].value;
    var sodt = dt[i].value;
    var dvcongtac = donvi[i].value;
    if (socccd === "") {
      cccd[i].classList.add("thieudl");
      checkinput = "false";
    } else {
      cccd[i].classList.remove("thieudl");
    }
    if (hovaten === "") {
      hoten[i].classList.add("thieudl");
      checkinput = "false";
    } else {
      hoten[i].classList.remove("thieudl");
    }
    if (sodt === "") {
      dt[i].classList.add("thieudl");
      checkinput = "false";
    } else {
      dt[i].classList.remove("thieudl");
    }
    if (dvcongtac === "") {
      donvi[i].classList.add("thieudl");
      checkinput = "false";
    } else {
      donvi[i].classList.remove("thieudl");
    }
    dsdangky.push("".concat(socccd, " | ").concat(hovaten, " | ").concat(sodt, " | ").concat(dvcongtac));
  }
  if (checkinput === "false") {
    alert("Vui lòng nhập đầy đủ thông tin người vào công ty");
    return;
  }
  var MaNV = idnguoidk.value;
  var HoTen = idhotendk.value;
  var BoPhan = idbophan.value;
  var ChucVu = idchucvu.value;
  var TuNgay = idtungay.value;
  var DenNgay = iddenngay.value;
  var TuGio = idtuthgian.value;
  var DenGio = iddenthgian.value;
  var LyDo = idlydo.value;
  var GhiChu = idghichu.value;
  var QuanLy = idquanly.value;
  if (MaNV === "") {
    alert("Vui lòng nhập mã nhân viên");
    return;
  }
  if (HoTen === "" || HoTen === "không tìm thấy") {
    alert("Mã nhân viên chưa đúng, vui lòng kiểm tra lại");
    return;
  }
  if (TuNgay === "" || DenNgay === "" || TuGio === "" || DenGio === "") {
    alert("Vui lòng nhập đầy đủ ngày tháng, thời gian dự kiến vào công ty");
    return;
  }
  if (TuNgay > DenNgay) {
    alert("Ngày tháng không hợp lệ! Ngày 'Từ ngày' không thể lớn hơn 'Đến ngày'");
    return;
  }
  if (LyDo === "") {
    alert("Vui lòng nhập lý do cho người vào công ty");
    return;
  }
  if (QuanLy === "") {
    alert("Vui lòng chọn quản lý xác nhận");
    return;
  }
  var ngaythang = TuNgay.split("-");
  var qs = confirm("X\xC1C NH\u1EACN! \nG\u1EEDi \u0111\u0103ng k\xFD cho ng\u01B0\u1EDDi v\xE0o c\xF4ng ty ng\xE0y ".concat(ngaythang[2], "/").concat(ngaythang[1], "/").concat(ngaythang[0]));
  if (qs === true) {
    var type = "dangkynguoivao";
    var data = {
      MaNV: MaNV,
      HoTen: HoTen,
      BoPhan: BoPhan,
      ChucVu: ChucVu,
      dsdangky: dsdangky,
      LyDo: LyDo,
      TuNgay: TuNgay,
      DenNgay: DenNgay,
      TuGio: TuGio,
      DenGio: DenGio,
      GhiChu: GhiChu,
      QuanLy: QuanLy
    };
    var submitData = {
      type: type,
      data: data
    };
    modal.style.display = "flex";
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(submitData) // p data type must match "Content-Type" header
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      if (data === true) {
        alert("✅ Đăng ký thành công! Vui lòng liên hệ với quản lý để được xác nhận");
      } else {
        alert("❌ Đăng ký không thành công ⚠ Vui lòng thử lại");
      }
    }).catch(function (error) {
      console.error("Error:", error);
      alert("❌ Đăng ký không thành công ⚠ Vui lòng thử lại");
    });
    modal.style.display = "none";
  }
});
var idmatracuu = document.getElementById("matracuu");
idmatracuu.addEventListener("input", function (e) {
  idmatracuu.value = idmatracuu.value.toUpperCase();
});
btnkiemtra.addEventListener("click", function (e) {
  e.preventDefault();
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34755" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map