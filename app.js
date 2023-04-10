const key = "7df22815d3bc4c8383deb0068fd38254";

const getNews = () => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let url =
      "https://newsapi.org/v2/top-headlines?" +
      "country=us&" +
      "apiKey=7df22815d3bc4c8383deb0068fd38254";
    xhr.open("GET", url);
    xhr.onprogress = () => {
      let elem = document.getElementById("accordionNews");
      let html = "";
      html = `<div class="text-center my-5">
                    <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div>
                </div>`;
      elem.innerHTML = html;
    };
    xhr.onload = function () {
      if (this.status === 200) {
        resolve(JSON.parse(this.responseText));
      } else {
        reject({
          status: this.status,
          statusText: this.statusText,
        });
      }
    };
    xhr.send();
  });
};
getNews()
  .then((response) => {
    let elem = document.getElementById("accordionNews");
    let html = "";

    response.articles.forEach((news, index) => {
      html += `<div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
        <button
        class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse${index}"
                    aria-expanded="true"
                    aria-controls="collapse${index}"
                    >
                    ${news.title}
                    </button>
                </h2>
                <div
                    id="collapse${index}"
                    class="accordion-collapse collapse show"
                    aria-labelledby="heading${index}"
                    data-bs-parent="#accordionNews"
                >
                    <div class="accordion-body">
                    <strong>This is the ${index} item's accordion body.</strong>${news.content}
                    </div>
                </div>
                </div>`;
    });
    elem.innerHTML = html;
  })
  .catch((error) => {
    console.log(error);
  });
