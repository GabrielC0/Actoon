import React, { useState, useEffect } from "react";
import Mower from "./Assets/Icons/Mower.png";

function AlgoMowers() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const [SizeGardenX, setSizeGardenX] = useState(0);
  const [SizeGardenY, setSizeGardenY] = useState(0);

  const [MowerX, setMowerX] = useState(0);
  const [MowerY, setMowerY] = useState(0);
  const [orientation, setOrientation] = useState("");

  const [R, setR] = useState(0);
  const [L, setL] = useState(0);
  const [F, setF] = useState(0);

  const [FinalSizeXGarden, setFinalSizeXGarden] = useState(0);

  useEffect(() => {
    const RealSizeXGarden = document.getElementById("Jardin");
    if (RealSizeXGarden) {
      setFinalSizeXGarden(RealSizeXGarden.offsetHeight);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const content = reader.result;
      setFileContent(content);

      const [Size, MowerPosition] = content.trim().split("\n");

      const [SizeX, SizeY] = Size.trim().split(" ");
      setSizeGardenX(parseInt(SizeX, 10));
      setSizeGardenY(parseInt(SizeY, 10));

      const [xMower, yMower, lastLetter] = MowerPosition.trim().split(" ");
      setMowerX(parseInt(xMower, 10));
      setMowerY(parseInt(yMower, 10));
      setOrientation(lastLetter);

      const countL = content.split("").filter((char) => char === "L").length;
      const countR = content.split("").filter((char) => char === "R").length;
      const countF = content.split("").filter((char) => char === "F").length;

      setL(countL);
      setR(countR);
      setF(countF);
    };
    reader.readAsText(file);
  };

  function Unlocked() {
    let imageClass = "Mower";
    switch (orientation) {
      case "N":
        imageClass += " rotate-0";
        break;
      case "E":
        imageClass += " rotate-90";
        break;
      case "S":
        imageClass += " rotate-180";
        break;
      case "W":
        imageClass += " rotate-270";
        break;
      default:
        break;
    }

    const mowerImage = document.getElementById("MowerImage");
    if (mowerImage) {
      mowerImage.className = imageClass;
    }
  }

  return (
    <div>
      <h2>AlgoMowers</h2>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <p>Le fichier sélectionné est : {selectedFile.name}</p>}
      {fileContent && (
        <div>
          <h3>Contenu du fichier :</h3>
          <pre>{fileContent}</pre>
          <p>SizeX : {SizeGardenX}</p>
          <p>SizeY : {SizeGardenY}</p>
          <p>xMower : {MowerX}</p>
          <p>yMower : {MowerY}</p>
          <p>Orientation : {orientation}</p>
          <p>L : {L}</p>
          <p>R : {R}</p>
          <p>F : {F}</p>
          <button onClick={Unlocked}>GO</button>
          <div>
            <img id="MowerImage" className="Mower" src={Mower} />
          </div>
        </div>
      )}
    </div>
  );
}

export default AlgoMowers;
