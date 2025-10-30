$(document).ready(function() {
    const container = $("#problems-container");
    const search = $("#search");
    const modal = $("#modal-overlay");
    // Cargar base de datos
    function loadProblems() {
        container.html('<p class="loading">Analizando base de datos...</p>');
        $.getJSON("bd.json", function(data) {
            container.empty();
            window.pcdexData = data;
            data.forEach((item, i) => {
                const card = $(`
          <div class="problem-card" data-index="${i}">
            <h2>${item.nombre}</h2>
            <p>${item.descripcion}</p>
          </div>
                `);
                container.append(card);
            });
        }).fail(() => {
            container.html('<p style="color:#f55; text-align:center;">⚠️ Error al acceder a bd.json</p>');
        });
    }
    // Búsqueda en tiempo real
    search.on("keyup", function() {
        const term = $(this).val().toLowerCase().trim();
        $(".problem-card").each(function() {
            const title = $(this).find("h2").text().toLowerCase();
            const desc = $(this).find("p").text().toLowerCase();
            $(this).toggle(title.includes(term) || desc.includes(term));
        });
    });
    // Abrir popup
    $(document).on("click", ".problem-card", function() {
        const index = $(this).data("index");
        const problem = window.pcdexData[index];
        $("#modal-title").text(problem.nombre);
        $("#modal-descripcion").text(problem.descripcion);
        $("#modal-solucion").text(problem.solucion);
        $("#modal-explicacion").text(problem.explicacion);
        modal.fadeIn(200).css("display", "flex");
    });
    // Cerrar popup
    $("#close-modal, #modal-overlay").click(function(e) {
        if (e.target.id === "close-modal" || e.target.id === "modal-overlay") {
            modal.fadeOut(200);
        }
    });
    $("#reload").click(loadProblems);
    loadProblems();
});