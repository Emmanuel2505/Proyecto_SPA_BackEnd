const FunctionsCtrl = {};

FunctionsCtrl.emailValidate = (email) => {
  const rx =
    /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
  return rx.test(email);
};

FunctionsCtrl.priceValidate = (price) => {
  try {
    const p = parseFloat(price);
    let chis = true;
    if (p <= 0) {
      chis = false;
    }
    return chis;
  } catch (error) {
    console.log(error);
    return false;
  }
};

FunctionsCtrl.passwordValidate = (password) => {
  try {
    const rx = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/g;
    return rx.test(password);
  } catch (error) {
    console.log(error);
    return false;
  }
};

FunctionsCtrl.phoneValidate = (phone) => {
  try {
    const rx = /^(\+593|09)([\d]){8}$/;
    return rx.test(phone);
  } catch (error) {
    console.log(error);
    return false;
  }
};

FunctionsCtrl.dniValidate = (cedula) => {
  try {
    let chis = false;

    let [suma, mul, chars] = [0, 1, cedula.length];
    for (let index = 0; index < chars; index += 1) {
      let num = cedula[index] * mul;
      suma += num - (num > 9) * 9;
      mul = 1 << index % 2;
    }

    if (!(suma % 10 === 0 && suma > 0)) chis = true;

    return chis;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = FunctionsCtrl;
