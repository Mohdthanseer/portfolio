$(document).ready(function () {

    // Navbar toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll behavior
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });
});

// Page visibility title change
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio MOHAMMED THANSEER";
        $("#favicon").attr("href", "/assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "/assets/images/favicon.png");
    }
});

// Fetch projects
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json())
        .then(data => data);
}

// Display projects
function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
        projectsHTML += `
        <div class="grid-item ${project.category}">
            <div class="box tilt">
                <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="${project.name}" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    projectsContainer.innerHTML = projectsHTML;

    // Initialize Isotope
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: {
            columnWidth: 200
        }
    });

    // Filter buttons
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

// Load projects
getProjects().then(data => showProjects(data));

// Disable developer shortcuts
document.onkeydown = function (e) {
    if (e.keyCode == 123 ||
        (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(String.fromCharCode(e.keyCode))) ||
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))
    ) {
        return false;
    }
};
