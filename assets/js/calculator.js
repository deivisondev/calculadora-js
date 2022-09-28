function Calculator() {
    this.display = document.querySelector(".display");

    this.start = () => {
        this.pressKeyToFilter();
        this.onClickButton();
        this.pressKeyToCalculate();
    };

    this.onClickButton = () => {
        document.addEventListener("click", event => {
            const element = event.target;
            this.display.focus();

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
    };

    this.setDigit = (value) => {
        this.display.value += value;
    };

    this.clearDisplay = () => {
        this.display.value = "";
    };

    this.delDigit = () => {
        this.display.value = this.display.value.slice(0, -1);
    };

    this.calculate = () => {
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
    };

    this.mask = (value) => {
        return value.replaceAll(/[A-z]*/g, "");
    };

    this.pressKeyToCalculate = () => {
        document.addEventListener("keyup", e => {
            this.display.value = this.mask(this.display.value);

            if (e.keyCode === 13) this.calculate();
        });
    };

    this.pressKeyToFilter = () => {
        document.addEventListener("keypress", e => {
            this.display.value = this.mask(this.display.value);
        });
    };
}

const calculator = new Calculator();

calculator.start();
