
function getData() {
      return new Promise((resolve, reject) => {
            username = document.getElementById("username");
            password = document.getElementById("pwd");

            const request = new XMLHttpRequest();

            request.onreadystatechange = () => {
                  if (request.readyState == 4 && request.status == 200) {
                        resolve(request.response);
                  }
                  else if (request.readyState == 4) {
                        reject("Failed to connect");
                  }
            };

            request.open("GET", "/login/:id")
            request.send;
      });
}

function grantAccess() {
      getData().then((data) => {
            console.log(data);
      }).catch((err) => {
            console.log(err);
      });
}

function init() {
      document.getElementById("button").addEventListener("click", grantAccess);
}

