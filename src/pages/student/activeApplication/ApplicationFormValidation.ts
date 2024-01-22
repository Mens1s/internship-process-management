import moment from "moment";

export const validateApplicationForm = (form: any) => {
  if (form.tc) {
    var tek = 0,
      cift = 0,
      sonuc = 0,
      TCToplam = 0,
      i = 0;

    const rule2 = form.tc.length == 11;
    const rule3 = form.tc[0] != 0;
    const rule1 = /^\d+$/.test(form.tc);

    tek =
      parseInt(form.tc[0]) +
      parseInt(form.tc[2]) +
      parseInt(form.tc[4]) +
      parseInt(form.tc[6]) +
      parseInt(form.tc[8]);
    cift =
      parseInt(form.tc[1]) +
      parseInt(form.tc[3]) +
      parseInt(form.tc[5]) +
      parseInt(form.tc[7]);

    tek = tek * 7;
    sonuc = tek - cift;
    const rule4 = sonuc % 10 != form.tc[9];

    for (var i = 0; i < 10; i++) {
      TCToplam += parseInt(form.tc[i]);
    }

    const rule5 = TCToplam % 10 != form.tc[10];

    if (!rule1 || !rule2 || !rule3 || !rule4 || !rule5) {
      return {
        status: false,
        message: "Lütfen geçerli bir kimlik numarası giriniz.",
      };
    }
  }

  if (form.studentNumber) {
    const rule1 = /^\d+$/.test(form.studentNumber);
    if (!rule1) {
      return {
        status: false,
        message: "Lütfen geçerli bir öğrenci numarası giriniz.",
      };
    }
  }

  if (form.telephoneNumber) {
    const rule1 = /^\d+$/.test(form.telephoneNumber);
    if (!rule1) {
      return {
        status: false,
        message: "Lütfen geçerli bir telefon numarası giriniz.",
      };
    }
  }

  if (form.internshipType) {
    const rule1 =
      form.internshipType.toLowerCase() == "zorunlu" ||
      form.internshipType.toLowerCase() == "isteğe bağlı";
    if (!rule1) {
      return {
        status: false,
        message: `Staj türü "Zorunlu" veya "İsteğe Bağlı" olmalıdır`,
      };
    }
  }

  /*  if (form.startDate && form.endDate) {
    const startDate = moment(form.startDate, "YYYY-MM-DD");
    const endDate = moment(form.endDate, "YYYY-MM-DD");
    const durationInDays = endDate.diff(startDate, "days");
    console.log(durationInDays);

    if (durationInDays < 20) {
      return {
        status: false,
        message: "Staj süresi en az 20 gün olmalıdır",
      };
    }
  } */

  if (form.engineerMail) {
    const rule1 = form.engineerMail.includes("@");
    if (!rule1) {
      return {
        status: false,
        message: "Lütfen geçerli bir mail adresi giriniz.",
      };
    }
  }

  return { status: true, message: "Form bilgileri güncellendi" };
};
