let fileSelect = document.getElementById('file-upload'),
    fileDrag = document.getElementById('file-drag')

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

        let isGood = (/\.(?=jpg)/gi).test(imageName);
        if (isGood) {
            document.getElementById('start').classList.add("hidden");
            // Thumbnail Preview
            document.getElementById('file-image').classList.remove("hidden");
            document.getElementById('file-image').src = URL.createObjectURL(file);
        } else {
            document.getElementById('file-image').classList.add("hidden");
            document.getElementById('start').classList.remove("hidden");
            document.getElementById("file-upload-form").reset();
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Solo se admiten imagenes .JPG'
            })
        }
    }


    // Check for the various File API support.
    if (window.File && window.FileList && window.FileReader) {
        Init();
    } else {
        document.getElementById('file-drag').style.display = 'none';
    }
}
ekUpload();



export async function upload(id) {
    if (fileSelect.files.length > 0) {
        let data = new FormData();
        data.append("file", fileSelect.files[0]);
        data.append("name", fileSelect.files[0].name);
        data.append("id", id);
        data.append("ext", fileSelect.files[0].name.split('.').pop());

        let rs = await fetch("/uploadPhoto", {
            method: "POST",
            body: data,
            headers: {
                'Accept': 'multipart/form-data'
            },
        })

        let response = await rs.text();

        if (response == "OK") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'La foto ha sido actualizada',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }
}