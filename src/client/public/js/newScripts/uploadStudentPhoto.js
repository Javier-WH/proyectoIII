let fileSelect = document.getElementById('file-upload'),
    fileDrag = document.getElementById('file-drag'),
    submitButton = document.getElementById('submit-button');

function ekUpload() {
    function Init() {


        fileSelect.addEventListener('change', fileSelectHandler, false);

        // Is XHR2 available?
        let xhr = new XMLHttpRequest();
        if (xhr.upload) {
            // File Drop
            fileDrag.addEventListener('dragover', fileDragHover, false);
            fileDrag.addEventListener('dragleave', fileDragHover, false);
            fileDrag.addEventListener('drop', fileSelectHandler, false);
        }
    }

    function fileDragHover(e) {
        let fileDrag = document.getElementById('file-drag');

        e.stopPropagation();
        e.preventDefault();

        fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
    }

    function fileSelectHandler(e) {
        // Fetch FileList object
        let files = e.target.files || e.dataTransfer.files;

        // Cancel event and hover styling
        fileDragHover(e);

        // Process all File objects
        for (let i = 0, f; f = files[i]; i++) {
            parseFile(f);
            // uploadFile(f);
        }
    }

    // Output


    function parseFile(file) {


        // let fileType = file.type;
        // console.log(fileType);
        let imageName = file.name;

        let isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
        if (isGood) {
            document.getElementById('start').classList.add("hidden");

            document.getElementById('notimage').classList.add("hidden");
            // Thumbnail Preview
            document.getElementById('file-image').classList.remove("hidden");
            document.getElementById('file-image').src = URL.createObjectURL(file);
        } else {
            document.getElementById('file-image').classList.add("hidden");
            document.getElementById('notimage').classList.remove("hidden");
            document.getElementById('start').classList.remove("hidden");

            document.getElementById("file-upload-form").reset();
        }
    }


    // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
        Init();
    } else {
        document.getElementById('file-drag').style.display = 'none';
    }
}


async function upload(id) {
    let data = new FormData();
    data.append("file", fileSelect.files[0]);
    data.append("id", id)

    let rs = await fetch("/uploadPhoto", {
        method: "POST",
        body: data
    })

    let response = await rs.text();

    if (response == "OK") {
        console.log("foto actualizada")
    }
}





ekUpload();