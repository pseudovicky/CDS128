const container = document.querySelector("#alumni_wrapper_container");
const searchInput = document.querySelector("#searchInput");


function createAlumniCard(alumni) {

    const {AlumniName, RID, startYear, endYear, COURSE, DEPT, highlighted, EMAIL, profile_url, fmt_date} = alumni;

    const alumni_html = `
        <div class="alumni_card">
            <div class="status">Active</div>
               <img src="https://via.placeholder.com/80" alt="Avatar" class="avatar">
                <div class="alumni_name">${AlumniName}</div>
                <div class="alumni_regNo">${RID}</div>

                <div class="details">
                    <div>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-calendar-range">
                                <rect width="18" height="18" x="3" y="4" rx="2" />
                                <path d="M16 2v4" />
                                <path d="M3 10h18" />
                                <path d="M8 2v4" />
                                <path d="M17 14h-6" />
                                <path d="M13 18H7" />
                                <path d="M7 14h.01" />
                                <path d="M17 18h.01" />
                            </svg>
                        </span>
                        ${startYear}-${endYear}
                    </div>
                    <div>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-school">
                                <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
                                <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
                                <path d="M18 5v17" />
                                <path d="m4 6 8-4 8 4" />
                                <path d="M6 5v17" />
                                <circle cx="12" cy="9" r="2" />
                            </svg>
                        </span>
                        ${COURSE} • ${DEPT}
                    </div>
                    <div class="highlighted">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-trophy">
                                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                <path d="M4 22h16" />
                                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                            </svg>
                        </span>
                        ${highlighted}
                    </div>
                    <div class="label">
                        <a href="mailto:bagusfikri@gmail.com">${EMAIL}</a>
                    </div>
                </div>

                <div class="footer">Joined at ${fmt_date} • <a href="${profile_url}">View details</a></div>
            </div>
    `
}

let alumniData = []

function filterAlumniCards(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = alumniData.filter(alumni => {
        const alumniName = alumni.name.toLowerCase();
        const course = alumni.course.toLowerCase();
        const department = alumni.department.toLowerCase();
        const highlighted = alumni.highlighted.toLowerCase();
        return alumniName.includes(searchValue) ||
            course.includes(searchValue) ||
            department.includes(searchValue) ||
            highlighted.includes(searchValue)
    });
    populateAlumni(filteredData);
}

searchInput.addEventListener("input", filterAlumniCards);

async function fetchAlumni(page = 1, limit = 10) {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`)
    const data = await response.json()
    alumniData = data
    return data
}
const API_URL = 'http://api.alumnilist.com/v1/all'

async function fetchAlumni(page = 1, limit = 10) {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`)
    const data = await response.json()
    return data
}

function populateAlumni(data) {
    const fragment = document.createDocumentFragment()
    data.forEach(alumni => {
        const card = createAlumniCard(alumni)
        fragment.appendChild(card)
    })
    container.appendChild(fragment)
}

let page = 1
let limit = 10

async function loadAlumni() {
    const data = await fetchAlumni(page, limit)
    populateAlumni(data)

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            page += 1
            loadAlumni()
        }
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
    })

    const sentinel = document.createElement('div')
    observer.observe(sentinel)
    container.appendChild(sentinel)
}

loadAlumni()

