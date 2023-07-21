const URL =
  "https://script.google.com/macros/s/AKfycbx0GSLbskHs630bOv2Owxs4XOt3XQTqSo0644SddRj46nnOP2806WnoYxmeGZfEKaV7/exec";
const dsnguoivao = document.querySelector(".dsnguoivao");
const btnThemNg = document.getElementById("btnAdd");
const btnguidk = document.getElementById("btnguidk");
const btnkiemtra = document.getElementById("btnkiemtra");
const listItems = document.querySelectorAll(".menu li");
const modal = document.getElementById("dangchay");
var dsns = [];
var stt = 1;
const idnguoidk = document.getElementById("idngdk");
const idhotendk = document.getElementById("idhotendk");
const idbophan = document.getElementById("idbophan");
const idchucvu = document.getElementById("idchucvu");
const idtungay = document.getElementById("idtungay");
const iddenngay = document.getElementById("iddenngay");
const idtuthgian = document.getElementById("idtuthgian");
const iddenthgian = document.getElementById("iddenthgian");
const idlydo = document.getElementById("idlydo");
const idghichu = document.getElementById("idghichu");
const idquanly = document.getElementById("quanly");

listItems.forEach((item) => {
  item.addEventListener("click", function () {
    var pgname = this.getAttribute("value");
    var pgclick = document.getElementById(pgname);
    if (pgclick !== null) {
      listItems.forEach((li) => {
        // Xóa class 'selected' khỏi tất cả các mục <li> khác
        li.classList.remove("active");
        var pgname = li.getAttribute("value");
        var pg = document.getElementById(pgname);
        try {
          pg.classList.add("hidden");
        } catch {}
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
    let submitData = {
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
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dsns = [...data];
        modal.classList.remove("display");
      })
      .catch((error) => {
        console.error("Error:", error);
        modal.classList.remove("display");
        alert("Không tìm thấy cơ sở dữ liệu nhân sự, vui lòng kiểm tra lại");
      });
  }
}

btnThemNg.addEventListener("click", (e) => {
  e.preventDefault();
  var donvi = document.querySelectorAll(".DVcongTac");
  var dvi = donvi[donvi.length - 1].value;
  stt += 1;
  const temporaryDiv = document.createElement("div");

  var innerEle = `<input style="width:18px;border: none;padding-top:10px" value="${stt}/" class="soTT Ng${stt}" readonly></input>
  <input class="soCCCD Ng${stt}" type="text" style="width:108px; margin-bottom:2px" placeholder="Số CCCD"></input>
  <input class="HoVaTen Ng${stt}" type="text" style="width:210px; margin-bottom:2px" placeholder="Họ và tên"></input>
  <button id= "Ng${stt}" class="btnXoa Ng${stt}" style="width:21px;background-color:red;font-weight: ;">X</button>
  <br class="Ng${stt}">
  <input class="SoDT Ng${stt}" type="text" style="width:108px; margin-bottom:2px;margin-left: 25px" placeholder="Số điện thoại"></input>
  <input class="DVcongTac Ng${stt}" type="text" style="width:235px; margin-bottom:2px" placeholder="Đơn vị công tác" Value="${dvi}"></input>
  <br class="Ng${stt}">`;
  temporaryDiv.innerHTML = innerEle;
  while (temporaryDiv.firstChild) {
    dsnguoivao.appendChild(temporaryDiv.firstChild);
  }
  var dsbtnXoa = document.querySelectorAll(".btnXoa");
  lay_lai_tt();
  dsbtnXoa.forEach((btnXoa) => {
    btnXoa.addEventListener("click", (e) => {
      e.preventDefault();
      var tt = btnXoa.getAttribute("id");
      var dsinput = document.querySelectorAll(`.${tt}`);
      dsinput.forEach((elem) => {
        dsnguoivao.removeChild(elem);
        lay_lai_tt();
      });
    });
  });
});

function lay_lai_tt() {
  var dsSoTT = document.querySelectorAll(".soTT");
  for (var i = 0; i < dsSoTT.length; i++) {
    dsSoTT[i].value = `${i + 1}/`;
  }
}

idnguoidk.addEventListener("input", (e) => {
  idnguoidk.value = idnguoidk.value.toUpperCase();
  // idquanly.value = "";
  if (idnguoidk.value.length >= 7) {
    const nv = dsns.find(
      (nv) => nv.MaNV.toLowerCase() === idnguoidk.value.toLowerCase()
    );
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
      dsql = dsns.filter(
        (rs) =>
          // rs.BoPhan.toLowerCase() === idbophan.value.toLowerCase() &&
          rs.CapDuyet.toLowerCase() === "trưởng bộ phận" ||
          rs.CapDuyet.toLowerCase() === "phó phòng"
      );

      if (dsql.length > 0) {
        // var innerSelect = `<label>Quản lý xác nhận:</label>
        // <select id="quanly" style="font-size:16px; height: 25px;">`;
        var innerSelect = `<option value="">- Chọn quản lý xác nhận -</option>`;
        dsql.forEach(
          (rs) =>
            (innerSelect += `<option value ="${rs.HoTen}|${rs.BoPhan}">[${rs.BoPhan}] ${rs.HoTen}</option>`)
        );
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

btnguidk.addEventListener("click", (e) => {
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
    dsdangky.push(`${socccd} | ${hovaten} | ${sodt} | ${dvcongtac}`);
  }
  if (checkinput === "false") {
    alert("Vui lòng nhập đầy đủ thông tin người vào công ty");
    return;
  }
  const MaNV = idnguoidk.value;
  const HoTen = idhotendk.value;
  const BoPhan = idbophan.value;
  const ChucVu = idchucvu.value;
  const TuNgay = idtungay.value;
  const DenNgay = iddenngay.value;
  const TuGio = idtuthgian.value;
  const DenGio = iddenthgian.value;
  const LyDo = idlydo.value;
  const GhiChu = idghichu.value;
  const QuanLy = idquanly.value;
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
    alert(
      "Ngày tháng không hợp lệ! Ngày 'Từ ngày' không thể lớn hơn 'Đến ngày'"
    );
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
  let ngaythang = TuNgay.split("-");
  var qs = confirm(
    `XÁC NHẬN! \nGửi đăng ký cho người vào công ty ngày ${ngaythang[2]}/${ngaythang[1]}/${ngaythang[0]}`
  );
  if (qs === true) {
    const type = "dangkynguoivao";
    const data = {
      MaNV,
      HoTen,
      BoPhan,
      ChucVu,
      dsdangky,
      LyDo,
      TuNgay,
      DenNgay,
      TuGio,
      DenGio,
      GhiChu,
      QuanLy
    };
    const submitData = { type, data };
    modal.style.display = "flex";
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(submitData) // p data type must match "Content-Type" header
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data === true) {
          alert(
            "✅ Đăng ký thành công! Vui lòng liên hệ với quản lý để được xác nhận"
          );
        } else {
          alert("❌ Đăng ký không thành công ⚠ Vui lòng thử lại");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("❌ Đăng ký không thành công ⚠ Vui lòng thử lại");
      });
    modal.style.display = "none";
  }
});

const idmatracuu = document.getElementById("matracuu");
idmatracuu.addEventListener("input", (e) => {
  idmatracuu.value = idmatracuu.value.toUpperCase();
});

btnkiemtra.addEventListener("click", (e) => {
  e.preventDefault();
});
