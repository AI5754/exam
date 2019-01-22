var update = document.getElementById("update");
update.addEventListener("click", function() {
  // Send PUT Request here

  fetch("quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      student: document.getElementById("student").value,
      examen: document.getElementById("examen").value,
      reden: document.getElementById("reden").value
    })
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log("yes" + data);
      window.location.reload(true);
    });
});

var del = document.getElementById("delete");
del.addEventListener("click", function() {
  fetch("quotes", {
    method: "delete",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementById("deleteName").value
    })
  })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload(true);
    });
});
