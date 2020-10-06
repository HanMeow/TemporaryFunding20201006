function select(params) {
    if (typeof document?.querySelector === 'function') {
        return document.querySelector(params)
    }
    return null;
}

const amount = select('#amount');
const repayment = select('#repayment');
const installments = select('#installments');
const rate = select('#rate');
const final = select('#final');
const automatic = select('#automatic');

function calculate() {
    const { value: amountValue } = amount;
    const { value: repaymentValue } = repayment;
    const { value: installmentsValue } = installments;
    const { value: rateValue } = rate;
    if (+repaymentValue > 0 && +installmentsValue > 0 && +rateValue > 0) {
        const pay = +repaymentValue ?? 0;
        const times = +installmentsValue;
        const multiplication = 1 + (+rateValue/100/12);
        const result = {
            loan: +amountValue,
            autoPlan: 0,
        }
        for (let i = 0; i < times; i++) {
            result.loan = result.loan*multiplication;
            result.autoPlan = result.autoPlan*multiplication + pay;
        }
        final.value = result.loan.toFixed(2);
        automatic.value = result.autoPlan.toFixed(2);
    } else {
        final.value = '';
        automatic.value = '';
    }
}

[amount, repayment, installments, rate].forEach(dom => {
    if (dom) {
        dom.oninput = calculate;
    }
})