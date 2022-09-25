function calculator() {
    return {
        display: document.querySelector(".display"),

        start() {
            this.pressKeyToFilter();
            this.onClickButton();
            this.pressKeyToCalculate();
        },

        onClickButton() {
            document.addEventListener("click", event => {
                const element = event.target;

                const actions = {
                    "btn-num": () => {
                        this.setDigit(element.innerText);
                    },
                    "btn-clear": () => {
                        this.clearDisplay();
                    },
                    "btn-del": () => {
                        this.delDigit();
                    },
                    "btn-eq": () => {
                        this.calculate();
                    }
                }

                actions[element.classList[1]]?.();
            });
        },

        setDigit(value) {
            this.display.value += value;
        },

        clearDisplay() {
            this.display.value = "";
        },

        delDigit() {
            this.display.value = this.display.value.slice(0, -1);
        },

        calculate() {
            let value = this.display.value;

            try {
                value = eval(value);

                if (!(typeof value === "number")) {
                    alert("Cálculo inválido");
                    return;
                }

                this.display.value = value;
            }
            catch (e) {
                alert("Cálculo inválido");
            }
        },

        mask(value) {
            return value.replaceAll(/[A-z]*/g, "");
        },

        pressKeyToCalculate() {
            document.addEventListener("keyup", e => {
                this.display.value = this.mask(this.display.value);  

                if (e.keyCode === 13) this.calculate();
            });
        },

        pressKeyToFilter() {
            document.addEventListener("keypress", e => {
                this.display.value = this.mask(this.display.value);
            });
        }
    }
}

const startCalculator = calculator();

startCalculator.start();
