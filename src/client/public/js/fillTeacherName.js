export function fillTeacherName(teacher) {
    // document.getElementById('user-name').innerText = `${teacher.lastName} ${teacher.name}`;
    document.getElementById('user-name').innerHTML = `
                    <li class="nav-item dropdown" id="">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown-teacherName" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ${teacher.lastName} ${teacher.name}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown" id="seccion-box-teacherName">
                            <li><a class="dropdown-item" href="#" id="li-perfil">Perfil</a></li>
                         
                             <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li>
                                <a class="dropdown-item" href="#" id = "logout">Logout</a>
                            </li>
                        </ul>
                    </li>

    `;

}