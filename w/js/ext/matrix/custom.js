$(document).ready(function() {
    var $footer = $(".page-footer");
    var $currencyDropdown = $(".currency-dropdown__select");
    var zoomLevel = 1;
    var zoomStep = .05;
    var zoomLevelMin = .3;
    var zoomLevelMax = 1;

    $currencyDropdown.customSelect({
        customClass: "currency-dropdown__selector"
    });

    $footer.find(".disclaimer[data-currency=usd]").show();

    $("#zoom-out").on("click", function(e) {
        if ($(this).hasClass("disabled")) {
            return false
        }
        zoomLevel = zoomLevel - zoomStep;
        $("#matrix").css("transform", "scale(" + zoomLevel + ")").css("transform-origin", "0 0").css("width", 100 / zoomLevel + "%");
        if (zoomLevel <= zoomLevelMin) {
            $("#zoom-out").addClass("disabled")
        }
        $("#zoom-in").removeClass("disabled");
        $("#zoom-reset").removeClass("disabled");
        return false
    });

    $("#zoom-in").on("click", function(e) {
        if ($(this).hasClass("disabled")) {
            return false
        }
        zoomLevel = zoomLevel + zoomStep;
        $("#matrix").css("transform", "scale(" + zoomLevel + ")").css("transform-origin", "0 0").css("width", 100 / zoomLevel + "%");
        if (zoomLevel >= zoomLevelMax) {
            $("#zoom-in").addClass("disabled");
            $("#zoom-reset").addClass("disabled")
        }
        $("#zoom-out").removeClass("disabled");
        return false
    });

    $("#zoom-reset").on("click", function(e) {
        if ($(this).hasClass("disabled")) {
            return false
        }
        zoomLevel = 1;
        $("#matrix").css("transform", "scale(" + zoomLevel + ")").css("transform-origin", "0 0").css("width", 100 / zoomLevel + "%");
        $("#zoom-in").addClass("disabled");
        $("#zoom-reset").addClass("disabled");
        $("#zoom-out").removeClass("disabled");
        return false
    })
});

$(document).ready(function() {
    var table;
    var fixedColumns = 6;
    var excelUrl = "/excel/matrix-usd.xlsx";
    var $tableNavigationLeft = $(".table-navigation__left");
    var $tableNavigationRight = $(".table-navigation__right");
    var maxScroll;
    var tooltipTimeout;

    $.csv2table.cssReset();

    var tableParameters = {
        sortable: false,
        nowloadingMsg: "Loading...",

        onload: function(id, op, data, ary) {
            appendThead($("#matrix table"));
	    
            table = $("#matrix table").DataTable({
                paging: false,
                ordering: false,
                searching: true,
                pageLength: 100,
                scrollX: true,
                info: false,
                autoWidth: false,
                dom: "rt",
                columnDefs: [{
                    targets: "_all",
                    render: function(data, type, row) {
                        if (!isNaN(parseFloat(data)) && isFinite(data)) {
                            data = parseFloat(data).toFixed(2);
                            if (data == "-0.00") {
                                data = parseFloat(0).toFixed(2)
                            }
                        }
                        return data
                    },
                    createdCell: function(td, cellData, rowData, row, col) {
                        if (col == 0) {
                            $(td).addClass("col-sector")
                        } else if (col == 1) {
                            $(td).addClass("col-asset-class")
                        } else if (col >= 2 && col < fixedColumns) {
                            $(td).addClass("col-asset-type");
                            if (cellData.length > 0) {
                                var pctValue = parseFloat(cellData * 100).toFixed(2);
                                if (isNaN(pctValue)) {
                                    $(td).html("-")
                                } else {
                                    $(td).html(pctValue)
                                }
                            } else {
                                $(td).html("-")
                            }
                        }
                        if (col >= fixedColumns && isNaN(parseFloat(cellData))) {
                            $(td).addClass("col-header");
                            $(td).html('<span class="col-header-inner"><strong>' + cellData + "</strong></span>")
                        }
                        if (col >= fixedColumns && cellData.length == 0) {
                            $(td).addClass("empty")
                        }
                    }
                }],

                createdRow: function(row, data, dataIndex) {
                    var rowClass = data[0].toLowerCase().replace(/[^a-z0-9]/g, "-");
                    $(row).addClass(rowClass)
                },

                initComplete: function(settings, json) {
                    hideFullHeader();
                    mergeLikeRowsOnInit(0, this);
                    enableHighlighting();
                    enableRowSelection();
                    enableColumnSelection();
                    enableClearing();
                    enableAssetTypeFiltering();
                    enableAssetClassFiltering();
                    checkTableScroll();
                    generateDownloadLink(excelUrl);
                    $("#matrix-th-6").addClass("col-header")
                },
                fixedColumns: {
                    heightMatch: "none",
                    leftColumns: fixedColumns
                }
            })
        }
    };

    function loadCSV(url) {
        $("#matrix").csv2table(url, tableParameters)
    }

    function mergeLikeRowsOnInit(columnIndex, table) {
        var column = table.api().column(columnIndex);
        return mergeLikeRows(column, table, true)
    }

    function mergeLikeRows(column, table, useApi) {
        var rowspan = 0;
        var prevValue;
        var prevStart = 1;
        var nodes = column.nodes().to$();
        column.data().each(function(value, index) {
            if (value == prevValue) {
                rowspan = rowspan + 1;
                $(nodes[index]).hide()
            } else {
                $(nodes[prevStart]).html('<span class="vertical-text">' + $(nodes[prevStart]).text() + "</span>");
                $(nodes[prevStart]).attr("rowspan", rowspan);
                if (index > 0) {
                    if (useApi) {
                        $(table.api().row(index).node()).addClass("separator-row")
                    } else {
                        $(table.row(index).node()).addClass("separator-row")
                    }
                }
                prevStart = index;
                rowspan = 1
            }
            prevValue = value
        });
        $(nodes[prevStart]).html('<span class="vertical-text">' + $(nodes[prevStart]).text() + "</span>");
        $(nodes[prevStart]).attr("rowspan", rowspan)
    }

    function hideFullHeader() {
        $(".dataTables_scrollHead th:gt(" + fixedColumns + ")").css("visibility", "hidden")
    }

    function showFullHeader() {
        $(".dataTables_scrollHead th:gt(" + fixedColumns + ")").css("visibility", "visible")
    }

    function enableAssetTypeFiltering() {
        $(".asset-type-checkbox").on("click", function(e) {
            var colIndex = $(this).attr("data-column");
            var checked = $(this).is(":checked");
            var column = table.column(colIndex);
            column.visible(checked)
        })
    }

    function enableAssetClassFiltering() {
        $(".asset-class-checkbox").on("click", function(e) {
            if ($(".asset-class-checkbox:checked").length == 3) {
                hideFullHeader()
            } else {
                showFullHeader()
            }
            table.draw()
        });
        $.fn.dataTable.ext.search.push(function(settings, data, dataIndex) {
            var rowClass = data[0].toLowerCase().replace(/[^a-z0-9]/g, "-");
            if ($("input[name=asset-class-" + rowClass + "]").is(":checked")) {
                return true
            } else {
                return false
            }
        })
    }

    function enableClearing() {
        var isClearing = false;
        $("#filter-clear-selections").on("click", function() {
            if ($(this).hasClass("disabled") && !isClearing) {
                isClearing = true;
                //alert("Please choose some assets to compare by clicking row or column headings.");
                setTimeout(function() {
                    isClearing = false
                }, 1e3);
                return false
            }
            clearSelections()
        })
    }

    function clearSelections() {
        if ($("#matrix table").hasClass("filter-compare-active")) {
            hideFullHeader();
            table.columns().visible(true, false);
            table.columns.adjust().draw(false);
            $(".asset-type-checkbox").prop("checked", "checked");
            $("#matrix table").removeClass("filter-compare-active").removeClass("filter-compare-rows-active").removeClass("filter-compare-cols-active");
            $.fn.dataTable.ext.search.pop();
            mergeLikeRows(table.column(0), table, false)
        }
        $(table.rows().nodes()).removeClass("selected");
        $("td.selected").removeClass("selected");
        $("td").removeClass("clicked");
        $("div.options__selection .asset-selector").addClass("disabled");
        table.fixedColumns().update();
        table.draw()
    }

    function enableHighlighting() {
        $("#matrix-th-6").on("mouseenter", function(e) {
            $(table.cells().nodes()).removeClass("highlight").removeClass("active");
            $(table.rows().nodes()).removeClass("highlight");
            var colIdx = 6;
            $(table.column(colIdx).nodes()).addClass("highlight");
            var rowIdx = 0;
            $(table.row(rowIdx).node()).addClass("highlight");
            table.fixedColumns().update()
        });
        $("#matrix table tbody").on("mouseenter", "td", function(e) {
            if ($(this).hasClass("empty")) {
                $(table.cells().nodes()).removeClass("highlight").removeClass("active");
                $(table.rows().nodes()).removeClass("highlight")
            } else if ($(this).hasClass("col-header")) {
                var colIdx = table.cell(this).index().column;
                $(table.cells().nodes()).removeClass("highlight").removeClass("active");
                if (!isOnAssetClassColumn(e.pageX)) {
                    $(table.column(colIdx).nodes()).addClass("highlight")
                } else {
                    var correlatedColumnIdx = rowIdx + fixedColumns;
                    $(table.column(correlatedColumnIdx).nodes()).addClass("highlight")
                }
                var rowIdx = table.cell(this).index().row + 1;
                $(table.rows().nodes()).removeClass("highlight");
                $(table.row(rowIdx).node()).addClass("highlight")
            } else {
                var rowIdx = table.cell(this).index().row;
                $(table.rows().nodes()).removeClass("highlight");
                $(table.row(rowIdx).node()).addClass("highlight");
                var colIdx = table.cell(this).index().column;
                $(table.cells().nodes()).removeClass("highlight").removeClass("active");
                if (!isOnAssetClassColumn(e.pageX)) {
                    $(table.column(colIdx).nodes()).addClass("highlight")
                } else {
                    var correlatedColumnIdx = rowIdx + fixedColumns;
                    $(table.column(correlatedColumnIdx).nodes()).addClass("highlight")
                }
                if (table.cell(this).data().length > 0) {
                    $(table.cell(this).node()).addClass("active")
                }
                $(document).bind("mousemove", function(e) {
                    var tooltipWidth = $(".tablecell-tooltip").width();
                    var windowWidth = $(window).width() - 50 - tooltipWidth;
                    if (e.clientX >= windowWidth) {
                        $(".tablecell-tooltip").css({
                            left: e.clientX - tooltipWidth - 30,
                            top: e.pageY + 25
                        })
                    } else {
                        $(".tablecell-tooltip").css({
                            left: e.pageX + 15,
                            top: e.pageY + 15
                        })
                    }
                });
                var tooltipText;
                if ($(this).hasClass("col-asset-type")) {
                    tooltipText = "<strong>Risk and Return:</strong><span>" + $(table.column(colIdx).header()).text() + "</span>"
                } else {
                    tooltipText = "<strong>Correlating Asset Type:</strong><span>" + $(table.column(colIdx).header()).text() + "</span>"
                }
                if (!$(this).hasClass("col-asset-class")) {
                    tooltipTimeout = setTimeout(function() {
                        $(".tablecell-tooltip").addClass("visible");
                        $(".tablecell-tooltip").html(tooltipText)
                    }, 800)
                }
            }
            table.fixedColumns().update()
        }).on("click", "td", function() {
            if (!$(this).hasClass("col-asset-class") && !$(this).hasClass("col-header")) {
                $(this).toggleClass("clicked");
                $("div.options__selection .asset-selector").not("#filter-reset").removeClass("disabled")
            }
        }).on("mouseleave", "td", function() {
            var colIdx = table.cell(this).index().column;
            $(table.column(colIdx).nodes()).removeClass("highlight");
            var rowIdx = table.cell(this).index().row;
            $(table.row(rowIdx).node()).removeClass("highlight");
            if (table.cell(this).data().length > 0) {
                $(table.cell(this).node()).removeClass("active")
            }
            clearTimeout(tooltipTimeout);
            $(".tablecell-tooltip").removeClass("visible");
            table.fixedColumns().update()
        })
    }

    function enableRowSelection() {
        $("#matrix table tbody").on("click", "td", function(e) {
            if (isOnAssetClassColumn(e.pageX)) {
                var rowIdx = $(this).closest("tr").index();
                highlightRow(rowIdx);
                highlightColumn(rowIdx + fixedColumns);
                $("div.options__selection .asset-selector").not("#filter-reset").removeClass("disabled")
            }
        })
    }

    function enableColumnSelection() {
        $("#matrix table tbody, #matrix table thead").on("click", "td.col-header,th.csv2table-table-th", function(e) {
            var colIdx = $(this).index();
            var offset = 4 - $(".asset-type-checkbox:checked").length;
            colIdx = colIdx + offset;
            highlightColumn(colIdx);
            highlightRow(colIdx - fixedColumns);
            $("div.options__selection .asset-selector").not("#filter-reset").removeClass("disabled");
            e.stopPropagation()
        })
    }

    function highlightRow(rowIdx) {
        $(table.row(rowIdx).node()).toggleClass("selected");
        table.fixedColumns().update()
    }

    function highlightColumn(colIdx) {
        $(table.column(colIdx).header()).toggleClass("selected");
        var nodes = table.column(colIdx).nodes().to$();
        $(nodes).each(function(index, node) {
            $(node).toggleClass("selected")
        })
    }

    function appendThead(table) {
        var thead = table.find("thead");
        var thRows = table.find("tr:has(th)");
        if (thead.length === 0) {
            thead = jQuery("<thead></thead>").appendTo(table)
        }
        var copy = thRows.clone(true).appendTo("thead");
        thRows.remove()
    }

    function setScrollIcons() {
        if ($(".dataTables_scrollBody").scrollLeft() <= 0) {
            $tableNavigationLeft.addClass("inactive")
        } else {
            $tableNavigationLeft.removeClass("inactive")
        }
        maxScroll = $(".dataTables_scrollBody table").width() - $(".dataTables_scrollBody").width();
        if ($(".dataTables_scrollBody").scrollLeft() >= maxScroll) {
            $tableNavigationRight.addClass("inactive")
        } else {
            $tableNavigationRight.removeClass("inactive")
        }
        clearTimeout(tooltipTimeout);
        $(".tablecell-tooltip").removeClass("visible")
    }

    function checkTableScroll() {
        $(".dataTables_scrollBody").on("scroll", setScrollIcons)
    }

    function isOnAssetClassColumn(x) {
        var leftOfAssetColumn = $("table.DTFC_Cloned td.col-asset-class").first().offset().left;
        var rightOfAssetClassColumn = $("table.DTFC_Cloned td.col-asset-class").first().width() + $("table.DTFC_Cloned td.col-asset-class").first().offset().left;
        if (x < rightOfAssetClassColumn && x > leftOfAssetColumn) {
            return true
        } else {
            return false
        }
    }
    $tableNavigationLeft.click(function(event) {
        event.preventDefault();
        $(".dataTables_scrollBody").animate({
            scrollLeft: "-=300"
        }, "fast", function() {
            setScrollIcons()
        })
    });
    $tableNavigationRight.click(function(event) {
        event.preventDefault();
        $(".dataTables_scrollBody").animate({
            scrollLeft: "+=300"
        }, "fast", function() {
            setScrollIcons()
        })
    });
    var csv = location.search.split("csv=")[1];
    if (typeof csv == "undefined" || csv.length == 0) {
        csv = "usd"
    } else {
        $(".currency-dropdown__select").val(csv);
        $(".currency-dropdown__selectorInner").text($(".currency-dropdown__select option:selected").text())
    }

    $(".currency-dropdown__select").on("change", function() {
        var $this = $(this);
        var currency = $this.val();
        fixedColumns = $this.find("option[value=" + currency + "]").data("fixed-columns") || 6;
        var $footer = $(".page-footer");
        if (fixedColumns == 5) {
            $(".filter input[data-column=5]").closest(".item").hide()
        } else {
            $(".filter input[data-column=5]").closest(".item").show()
        }
        var url = "./csv/" + currency + ".csv";
        table.destroy();
        $("#matrix").html("");
        loadCSV(url);
        excelUrl = "/excel/matrix-" + currency + ".xlsx";
        var $disclaimers = $footer.find(".disclaimer");
        $disclaimers.hide();
        $footer.find(".disclaimer[data-currency=" + currency + "]").show();
        generateDownloadLink(excelUrl)
    });

    var $downloadButton = $("#btn-download");

    function generateDownloadLink(url) {
        $downloadButton.attr("href", url)
    }

    setTimeout(function(){
	loadCSV("../cfg/matrix/csv/" + csv + ".csv");
    }, 100);
});
