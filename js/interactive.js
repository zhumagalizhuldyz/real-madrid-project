
$(document).ready(function () {
    "use strict";

    $("#welcome-btn").on("click", function () {
        const name = $("#fan-name").val().trim();

        if (name === "") {
            $("#welcome-message")
                .text("Please enter your name first!")
                .removeClass("success-message")
                .addClass("error-message")
                .stop(true, true)
                .fadeIn(300);

            return;
        }

        $("#welcome-message")
            .text("Hala Madrid, " + name + "! Welcome to the Fan Zone!")
            .removeClass("error-message")
            .addClass("success-message")
            .stop(true, true)
            .fadeIn(300);
    });

   
    $("#fan-name").on("input", function () {
        if ($(this).val().trim() === "") {
            $("#welcome-message").text("");
        }
    });

    $("#theme-btn").on("click", function () {
        $("body").toggleClass("dark");

        const isDark = $("body").hasClass("dark");

        $(this).text(
            isDark ? "Switch to light theme" : "Switch to dark theme"
        );

        $("#theme-status")
            .text(isDark ? "Dark theme activated!" : "Light theme activated!")
            .stop(true, true)
            .fadeIn(300)
            .delay(1500)
            .fadeOut(500);
    });


    
    $(".faq-answer").prop("hidden", false).hide();

    $(".faq-question").on("click", function () {
        const button = $(this);
        const answerId = button.attr("aria-controls");
        const answer = $("#" + answerId);

        const isExpanded =
            button.attr("aria-expanded") === "true";

        answer.stop(true, true);

        if (isExpanded) {
            button.attr("aria-expanded", "false");

            answer.slideUp(300, function () {
                answer.prop("hidden", true);
            });

        } else {
            answer.prop("hidden", false);
            button.attr("aria-expanded", "true");

            answer.slideDown(300);
        }
    });


   
    let selectedCategory = "all";

    function filterPlayers() {
        const searchText = $("#player-search")
            .val()
            .trim()
            .toLowerCase();

        let visibleCount = 0;

        $(".searchable").each(function () {
            const card = $(this);

            const playerName = card
                .find(".player-name")
                .text()
                .toLowerCase();

            const playerPosition = card
                .find(".player-position")
                .text()
                .trim()
                .toLowerCase();

            const matchesSearch =
                playerName.includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                playerPosition === selectedCategory;

            if (matchesSearch && matchesCategory) {
                card.removeClass("is-hidden").show();
                visibleCount++;
            } else {
                card.addClass("is-hidden").hide();
            }
        });

        $("#search-count").text(
            "Showing " + visibleCount +
            " of " + $(".searchable").length + " players"
        );

        if (visibleCount === 0) {
            $("#no-results").text("No results found").show();
        } else {
            $("#no-results").hide();
        }
    }

    
    $("#player-search").on("input", function () {
        filterPlayers();
    });

    
    $(".category-filter").on("click", function () {
        selectedCategory = $(this).attr("data-category");

        $(".category-filter")
            .removeClass("active-category");

        $(this).addClass("active-category");

        filterPlayers();
    });

    // Initial filtering
    filterPlayers();


    
    function updateFavCount() {
        const total = $("#fav-list li").length;

        $("#fav-count").text(total);

        if (total === 0) {
            $("#fav-empty").show();
        } else {
            $("#fav-empty").hide();
        }
    }

   
    $("#fav-form").on("submit", function (event) {
        event.preventDefault();

        const playerName = $("#fav-input").val().trim();

        if (playerName === "") {
            $("#fav-error")
                .text("Please enter a player name!")
                .show();

            $("#fav-input").focus();
            return;
        }

        $("#fav-error").text("").hide();

        const newItem = $("<li></li>");

        const playerText = $("<span></span>")
            .text(playerName);

        const removeButton = $("<button></button>")
            .attr("type", "button")
            .addClass("remove-btn")
            .text("Remove");

        removeButton.attr(
            "aria-label",
            "Remove " + playerName
        );

        newItem.append(playerText);
        newItem.append(removeButton);

        $("#fav-list").append(newItem);

        $("#fav-input").val("").focus();

        updateFavCount();
    });

  
    $("#fav-list").on("click", ".remove-btn", function () {
        $(this).closest("li").remove();

        updateFavCount();
    });

    // Initial favourite count
    updateFavCount();

});
