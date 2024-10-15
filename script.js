const d = document,
  $btnDaily = d.getElementById("btn-daily"),
  $btnWeekly = d.getElementById("btn-weekly"),
  $btnMonthly = d.getElementById("btn-monthly"),
  $fragment = d.createDocumentFragment(),
  $titleText = d.querySelector(".title__text"),
  $template = d.getElementById("template").content;

let $cardGrid = d.querySelector(".card__grid");

let dailyArray;
let weeklyArray;
let monthlyArray;

function changeFocus(element, previus1, previus2) {
  previus2.classList.remove("time__item--active");
  previus1.classList.remove("time__item--active");
  element.classList.add("time__item--active");
}

let bgColors = [
  " hsl(15, 100%, 70%)",
  "hsl(195, 74%, 62%)",
  "hsl(348, 100%, 68%)",
  " hsl(145, 58%, 55%)",
  "hsl(264, 64%, 52%)",
  "hsl(43, 84%, 65%)",
];

async function getData() {
  try {
    let res = await fetch("./data.json");
    let data = await res.json();

    dailyArray = data.map((item) => item.timeframes.daily);
    weeklyArray = data.map((item) => item.timeframes.weekly);
    monthlyArray = data.map((item) => item.timeframes.monthly);

    const drawElement = (array) => {
      $cardGrid.innerHTML = " ";
      array.forEach((el, index) => {
        $cardGrid.innerHTML += `
       <section class="card">
            <section class="card__activity" style="background-color: ${bgColors[index]}">
              <img src="./images/icon-${data[index].title}.svg" alt="" class="card__activity--icon" />
            </section>
  
            <article class="card__activity__info">
              <article class="info__title">
                <p class="title__text">${data[index].title}</p>
                <img src="./images/icon-ellipsis.svg" alt="" />
              </article>
              <article class="info__data">
                <p class="current__time">${el.current}Hrs</p>
                <p class="previus__time">Previous - ${el.previous}Hrs</p>
              </article>
            </article>
          </section>
       `;
      });
    };

    const drawElementWeekly = (array) => {
      $cardGrid.innerHTML = " ";
      array.forEach((el, index) => {
        $cardGrid.innerHTML += `
               <section class="card">
                    <section class="card__activity" style="background-color: ${bgColors[index]}">
                      <img src="./images/icon-${data[index].title}.svg" alt="" class="card__activity--icon" />
                    </section>
          
                    <article class="card__activity__info">
                      <article class="info__title">
                        <p class="title__text">${data[index].title}</p>
                        <img src="./images/icon-ellipsis.svg" alt="" />
                      </article>
                      <article class="info__data">
                        <p class="current__time">${el.current}Hrs</p>
                        <p class="previus__time">Last Week - ${el.previous}Hrs</p>
                      </article>
                    </article>
                  </section>
               `;
      });
    };

    const drawElementMonthly = (array) => {
      $cardGrid.innerHTML = " ";
      array.forEach((el, index) => {
        $cardGrid.innerHTML += `
               <section class="card">
                    <section class="card__activity" style="background-color: ${bgColors[index]}">
                      <img src="./images/icon-${data[index].title}.svg" alt="" class="card__activity--icon" />
                    </section>
          
                    <article class="card__activity__info">
                      <article class="info__title">
                        <p class="title__text">${data[index].title}</p>
                        <img src="./images/icon-ellipsis.svg" alt="" />
                      </article>
                      <article class="info__data">
                        <p class="current__time">${el.current}Hrs</p>
                        <p class="previus__time">Last Month - ${el.previous}Hrs</p>
                      </article>
                    </article>
                  </section>
               `;
      });
    };


    drawElementWeekly(weeklyArray);

    $btnDaily.addEventListener("click", (e) => {
      drawElement(dailyArray);
      changeFocus($btnDaily, $btnWeekly, $btnMonthly);
    });

    $btnWeekly.addEventListener("click", (e) => {
      drawElementWeekly(weeklyArray);
      changeFocus($btnWeekly, $btnDaily, $btnMonthly);
    });

    $btnMonthly.addEventListener("click", (e) => {
      drawElementMonthly(monthlyArray);
      changeFocus($btnMonthly, $btnWeekly, $btnDaily);
    });
  } catch (error) {}
}

getData();