function ReadTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        var allText = rawFile.responseText;
        return allText;
      }
    }
  };
  rawFile.send(null);
}

export default ReadTextFile("http://localhost:8080/uploads/shoemodel.js");
