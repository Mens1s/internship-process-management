import moment from "moment";

export const validateApplicationForm = (form: any) => {
  // Ensure that the required fields are filled
  if (form.tc) {
    const rule2 = form.tc.length == 11;
    const rule3 = form.tc[0] != 0;
    const rule1 = /^\d+$/.test(form.tc);
    if (!rule1 || !rule2 || !rule3) {
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
