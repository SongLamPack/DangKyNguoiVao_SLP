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
const idNhomKH = document.getElementById("idNhomKH");
const idNhapNhomKH = document.getElementById("NhapNhomKH");
const idLichTrinh = document.getElementById("idLichTrinh");
const idNhapLichTrinh = document.getElementById("NhapLichTrinh");
const idPhongHop = document.getElementById("idPhongHop");
const idNhapPhongHop = document.getElementById("NhapPhongHop");

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

idNhomKH.addEventListener("change", function () {
  if (idNhomKH.value === "Khác") {
    idNhapNhomKH.style.display = "inline";
    idNhomKH.style.width = "65px";
  } else {
    idNhapNhomKH.style.display = "none";
    idNhomKH.style.width = "";
  }
});

idLichTrinh.addEventListener("change", function () {
  if (idLichTrinh.value === "Khác") {
    idNhapLichTrinh.style.display = "inline";
    idLichTrinh.style.width = "65px";
  } else {
    idNhapLichTrinh.style.display = "none";
    idLichTrinh.style.width = "";
  }
  if (idLichTrinh.value === "Khác" || idLichTrinh.value === "Xưởng sản xuất") {
    idPhongHop.value = "";
  }
});

idPhongHop.addEventListener("change", function () {
  if (idPhongHop.value === "Khác") {
    idNhapPhongHop.style.display = "inline";
    idPhongHop.style.width = "65px";
  } else {
    idNhapPhongHop.style.display = "none";
    idPhongHop.style.width = "";
  }
});

btnguidk.addEventListener("click", (e) => {
  e.preventDefault();
  var stt = document.querySelectorAll(".soTT");
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
    var tt = stt[i].value;
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
    dsdangky.push(`${tt} [${socccd}] ${hovaten} |ĐV:${dvcongtac} |ĐT:${sodt}`);
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
  if (idNhomKH.value !== "Khác") {
    var NhomKH = idNhomKH.value;
  } else {
    var NhomKH = idNhapNhomKH.value;
  }
  if (idLichTrinh.value !== "Khác") {
    var LichTrinh = idLichTrinh.value;
  } else {
    var LichTrinh = idNhapLichTrinh.value;
  }
  if (idPhongHop.value !== "Khác") {
    var PhongHop = idPhongHop.value;
  } else {
    var PhongHop = idNhapPhongHop.value;
  }
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
  if (NhomKH === "") {
    alert("Vui lòng chọn nhóm khách");
    return;
  }
  if (LichTrinh === "") {
    alert("Vui lòng chọn lịch trình làm việc");
    return;
  }
  let ngaythang = TuNgay.split("-");
  var qs = confirm(
    `XÁC NHẬN! \nGửi đăng ký cho người vào công ty ngày ${ngaythang[2]}/${ngaythang[1]}/${ngaythang[0]}`
  );
  if (qs === true) {
    modal.classList.add("display");
    console.log(modal);
    const type = "dangkynguoivao";
    const data = {
      MaNV,
      HoTen,
      BoPhan,
      ChucVu,
      dsdangky,
      LyDo,
      GhiChu,
      TuNgay,
      DenNgay,
      TuGio,
      DenGio,
      NhomKH,
      LichTrinh,
      PhongHop,
      QuanLy
    };
    const submitData = { type, data };
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
    modal.classList.remove("display");
  }
});

const idmatracuu = document.getElementById("matracuu");
const idngaytracuu = document.getElementById("ngaytracuu");
idmatracuu.addEventListener("input", (e) => {
  idmatracuu.value = idmatracuu.value.toUpperCase();
});

btnkiemtra.addEventListener("click", (e) => {
  e.preventDefault();
  var resultEle = document.getElementById("result");
  var name = idmatracuu.value;
  var date = idngaytracuu.value;
  var idate = parseInt(date.split("-").join(""));
  if (name === "") {
    alert("Vui lòng nhập mã nhân viên tra cứu");
    return;
  }

  let submitData = {
    type: "check",
    data: { name, idate }
  };
  modal.classList.add("display");
  console.log(submitData);
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
      modal.classList.remove("display");
      render(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      modal.classList.remove("display");
      resultEle.innerHTML = `
      <div class="koduyet" style="color:red">
      <p>Không có kết quả nào phù hợp!</p>
      </div>
      `;
      // alert("không có kết quả nào, hãy kiểm tra thông tin tra cứu và thử lại");
    });
});

function render(listdata) {
  var resultEle = document.getElementById("result");
  var innerHtml = "";
  for (var i = 0; i < listdata.length; i++) {
    var data = listdata[i];
    innerHtml += `<div id="formketqua" class="${
      data.KetQua === 1 ? "dcduyet" : data.KetQua === -1 ? "koduyet" : ""
    }">
    <div>
      <h2 style="margin:0;text-align:center" class="${
        data.KetQua === 1 ? "done" : data.KetQua === -1 ? "fal" : "wait"
      }">${
      data.KetQua === 1
        ? "ĐƯỢC DUYỆT"
        : data.KetQua === -1
        ? "KHÔNG ĐƯỢC DUYỆT"
        : "ĐANG CHỜ"
    }</h2>
    </div>
    <div>
      <label>Người đăng ký:</label><br>
      <input type="text" style="width:133px" readonly Value="${
        data.MaNV
      }"></input>
      <input type="text" style="width:235px" readonly Value="${
        data.HoTen
      }"></input>
    </div>
      <div>
      <input type="text" style="width:133px" readonly Value="${
        data.BoPhan
      }"></input>
      <input type="text" style="width:235px" readonly Value="${
        data.ChucVu
      }"></input>
    </div>
      <div style="padding-top:10px">
      <label font-size: 14px>Danh sách người vào công ty:</label><br>
      <textarea class="nhaplieu" style="font-size: 16px;width:380px; height:${
        data.NguoiDuocVao.split(String.fromCharCode(10)).length * 37
      }px" readonly type="text">${data.NguoiDuocVao}</textarea >   
    </div>
    <div style="display:flex;padding-top:10px">
      <div style="text-align:right">
        <label>Từ ngày:</label>
        <input class="nhaplieu" type="text" style="width:90px" readonly value="${
          data.TuNgay
        }"></input>
        <br><label>Đến ngày:</label>
        <input class="nhaplieu" type="text" style="width:90px" readonly value="${
          data.DenNgay
        }"></input>
      </div>
      <div style="padding-left:15px;text-align:right">
        <label>Giờ vào:</label>
        <input class="nhaplieu" type="text" style="width:50px" readonly value="${
          data.GioVao
        }"></input>
        <br><label>Giờ ra:</label>
        <input class="nhaplieu" type="text" style="width:50px" readonly value="${
          data.GioRa
        }"></input>
      </div>
    </div>
    <div style="padding-top:10px">  
      <input class="nhaplieu" type="text" style="width:380px" readonly value="Lý do: ${
        data.LyDo
      }"></input>
      <br><input class="nhaplieu" type="text" style="width:380px" readonly value="Phương tiện: ${
        data.GhiChu
      }"></input>
      <br><input class="nhaplieu" type="text" style="width:380px" readonly value="Nhóm khách: ${
        data.NhomKH
      }"></input>
      <br><input class="nhaplieu" type="text" style="width:380px" readonly value="Lịch trình: ${
        data.LichTrinh
      }"></input>
      <br><input class="nhaplieu" type="text" style="width:380px" readonly value="Phòng họp: ${
        data.PhongHop
      }"></input>
    </div>  
    <div style="padding-top:10px">  
      <label>Trưởng bộ phận:</label>
      <input class="${
        data.TBPDuyet === "Duyệt"
          ? "done"
          : data.TBPDuyet === "Không"
          ? "fal"
          : "wait"
      }" style="width:68%" type="text" readonly value="${data.TruongBP} [${
      data.TBPDuyet
    }]"></input>
      <br><label>Phòng HCNS:</label>
      <input class="${
        data.NSDuyet === "Duyệt"
          ? "done"
          : data.NSDuyet === "Không"
          ? "fal"
          : "wait"
      }" style="width:72%" type="text" readonly value="${data.PhongNS} [${
      data.NSDuyet
    }]"></input>
      <br><label>Giám đốc:</label>
      <input class="${
        data.GDDuyet === "Duyệt"
          ? "done"
          : data.GDDuyet === "Không"
          ? "fal"
          : "wait"
      }" style="width:78%" type="text" readonly value="${data.GiamDoc} [${
      data.GDDuyet
    }]"></input>
      <br><label>Nội dung duyệt:</label>
      <input class="nhaplieu" style="width:78%" type="text" readonly value="${
        data.LyDoDuyet
      }"></input>
    </div>  
  </div>`;
  }
  resultEle.innerHTML = innerHtml;
}
