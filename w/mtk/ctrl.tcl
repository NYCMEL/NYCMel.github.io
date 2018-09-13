###HEADS###################################################################
#
#  Melify Internet Toolkit (MTK) - Copyright (C) 2015  Melify LLC.
#  
#  This program is free software: you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation, either version 3 of the License, or
#  any later version.
#  
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program.  If not, see http://www.gnu.org/licenses.
#
###HEADE###################################################################

namespace eval w {
    namespace eval ctrl {
	namespace eval form {}
    }
}

if {[info exist spec] == 0} {
    array set spec {
	access "#"
    }
}

######################################################
##### 
######################################################
m::proc -public w::ctrl::box:x {
} {
    Documentation goes here...
} {
    Trace
    
    iframe src=[URL callback w::ctrl::box:guts ajax 0 item $::item] width=100% height=60 frameborder=1
}

######################################################
##### 
######################################################
m::proc -public w::ctrl::box {
} {
    Documentation goes here...
} {
    Trace
    
    put {
	<style>
	.btn:focus,.btn:active {
	    outline: none !important;
	}
	</style>
    }

    set style "style=float:left\;margin-top:3px"

    set links [subst {
	"<i class='btn-components fa fa-home' $style></i>&nbsp;COMPONENTS"	"/Melify/mtk/dev/tk/lib/components/w/doc/[string totitle ${::item}].html"
	"<i class='btn-html fa fa-html5 fa' $style></i>&nbsp;HTML CODE"		"[URL callback tk::viewsource file /Melify/mtk/dev/tk/lib/components/w/html/${::item}.html]"
	"<i class='btn-js fa fa-code' $style></i>&nbsp;JAVASCRIPT"		"[URL callback tk::viewsource file /Melify/mtk/dev/tk/lib/components/w/js/${::item}.js]"
	"<i class='btn-style fa fa-css3' $style></i>&nbsp;STYLES"		"[URL callback tk::viewsource file /Melify/mtk/dev/tk/lib/components/w/scss/_${::item}.scss]"
    }]

    put {
	<script>
	function appClass(type) {
	    jQuery("#my-header").prop("type", type);
	}
	</script>
    }

    set linksheader {
	"Thick Header"	"javascript:jQuery('#my-header').attr('type','thick')"
	"Thin Header"	"javascript:jQuery('#my-header').attr('type','thin')"
    }

    if {([info exist ::spec([string tolower $::item])] == 0) || ($::spec($::item) == "#")} {
	set specurl "#"
    } else {
	set specurl "$::spec($::item)"
	set specurl "http://melify.com"
    }

    #lappend links "<i class='fa fa-files-o'></i> SPECS" "$specurl"

    division class="clearfix" {
	division class="pull-left" {
	    division class="btn-group btn-group-sm" style="margin: 9px 0 5px" {
		set style [style min-width 130px]

		set cnt -1

		foreach {i j} $links {
		    incr cnt

		    if {$cnt == 0} {
			set type "outline-success"
		    } else {
			set type "outline-secondary"
		    }

		    if {$cnt == 4} {

		    } else {
			set state ""
		    }
		    
		    put [url "$i" "[subst $j]" class="btn btn-$type $state" $style]
		}
	    }
	}
	if {[info exist ::resizer] == 1} {
	    division class="pull-left" {
		division class="btn-group btn-group-sm resizer" style="margin: 9px 15px 5px" {
		    set style [style min-width 50px]

		    foreach {i j} {"S" sm "M" md "L" lg} {
			put [subst {
			    <button type="button" class="btn btn-outline-secondary $j" onclick="util.resize('$j')" $style>$i</button>
			}]
		    }
		}
	    }
	}
	if {[info exist ::direction] == 1} {
	    division class="pull-left" {
		division class="btn-group btn-group-sm direction" style="margin: 9px 15px 5px" {
		    set style [style min-width 50px]
		    
		    foreach {i j} {"H" h "V" v} {
			if {$i == "H"} {
			    set state "active"
			} else {
			    set state ""
			}
			
			put [subst {
			    <button type="button" class="btn $state btn-outline-primary $j" onclick="util.direction('$j')" $style>$i</button>
			}]
		    }
		}
	    }
	}
    }

    hr
}

######################################################
##### 
######################################################
m::proc -public w::ctrl::apps {
} {
    Documentation goes here...
} {
    Trace
    
    hr

    set links {
	"Default"			"mc.toggleAppClass('lob-0')"
	"Clearing Services"		"mc.toggleAppClass('lob-1')"
	"Data Services"			"mc.toggleAppClass('lob-2')"
	"Derivative Services"		"mc.toggleAppClass('lob-3')"
	"Matching Settlement"		"mc.toggleAppClass('lob-4')"
	"Collateral Management"		"mc.toggleAppClass('lob-5')"
	"Wealth Menagement"		"mc.toggleAppClass('lob-6')"
    }

    division class="btn-group btn-group-sm" style="margin: 9px 0 5px" {
	foreach {i j} $links {
	    put [url "$i" "#" class="btn btn-default btn-sm" onclick="[subst $j]"]
	}
    }
}

######################################################
##### 
######################################################
m::proc -public w::ctrl::colors {
} {
    Documentation goes here...
} {
    Trace
    
    hr

    set links {
	"Default"	"mc.changeAppColor('$::cls','mc-default')"
	"Yellow"	"mc.changeAppColor('$::cls','mc-yellow')"
	"Magenta"	"mc.changeAppColor('$::cls','mc-magenta')"
	"Gray"		"mc.changeAppColor('$::cls','mc-gray')"
	"Green"		"mc.changeAppColor('$::cls','mc-green')"
	"Orange"	"mc.changeAppColor('$::cls','mc-orange')"
	"Marine"	"mc.changeAppColor('$::cls','mc-marine')"
    }

    set style [style min-width 80px padding-left 10px padding-right 10px]

    division class="btn-group btn-group-sm" style="margin: 9px 0 5px" {
	foreach {i j} $links {
	    put [url "$i" "#" class="btn btn-default btn-sm" $style onclick="[subst $j]"]
	}
    }
}


######################################################
##### 
######################################################
m::proc -public w::ctrl::form::error {
} {
    Documentation goes here...
} {
    Trace
    
    hr

    set links {
	"Normal"	"mc.changeFormClass('$::cls','default')"
	"Errors"	"mc.changeFormClass('$::cls','error')"
	"Small"		"mc.changeFormClass('$::cls','sm')"
	"Medium"	"mc.changeFormClass('$::cls','md')"
	"Large"		"mc.changeFormClass('$::cls','lg')"
    }

    division class="btn-group btn-group-sm" style="margin: 9px 0 5px" {
	set style [style min-width 80px padding-left 10px padding-right 10px]
	
	foreach {i j} $links {
	    put [url "$i" "#" class="btn btn-default btn-sm" $style onclick="[subst $j]"]
	}
    }
}

######################################################
##### 
######################################################
m::proc -public w::ctrl::menus {
} {
    Documentation goes here...
} {
    Trace
    
    bullet_list class="list-group" {
	foreach i [lsort [glob -nocomplain "/Melify/mtk/dev/tk/lib/components/w/*.html"]] {
	    set comp [lindex [split [file tail $i] .] 0]
	    
	    put [url "$comp" "#" class="list-group-item"]
	}
    }
}

######################################################
##### 
######################################################
m::proc -public w::ctrl::disclaimer {
} {
    Documentation goes here...
} {
    Trace
    
    division [style padding 50px] {
	p {
	    <blockquote class="blockquote" style=color:brown>
	    <H3>DISCLAIMER</H3>
	    THIS PACKAGE IS DISTRIBUTED IN THE HOPE THAT IT WILL BE
	    USEFUL, BUT WITHOUT ANY WARRANTY; WITHOUT EVEN THE IMPLIED WARRANTY OF
	    MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
	    IT IS BEING SERVED AS A <b>POC</b> AND A ROADMAP MOVING FORWARD
	    </blockquote>
	}
    }
}

######################################################
##### 
######################################################
m::proc -public w::ctrl::form {
} {
    Documentation goes here...
} {
    Trace
    
    set style [style min-width 150px]

    division class="btn-group btn-group-sm" style="margin: 9px 0 5px" {
	button "Default" class="btn btn-default" $style onclick="jQuery('.form-element').removeClass('inline-block').addClass('block').css('border','3px red solid')"
	button "Inline"  class="btn btn-default" $style onclick="jQuery('.form-element').removeClass('block').addClass('inline-block')\;alert('b')"
    }

    javascript {
	put {
	    $(".btn").on("click", function() {
		console.log("ZZZZZZZZZZZZZZZZZZZZZ");
	    });
	}
    }
}

######################################################
##### 
######################################################
m::proc -public w::ctrl::form::title {
} {
    Documentation goes here...
} {
    Trace

    put {
	<h3 style=margin-top:0>
	<span id="form-size" data-key="formsize">(MD)</span> -
	<span id="form-title" data-key="formtitle">
	Horizontal
	</span>
	Form
	<small>(With data binding)</small></h3>
	<BR>
    }
}

######################################################
##### 
######################################################
m::proc -public create:table {
} {
    Documentation goes here...
} {
    Trace
    
    table class="table table-striped dataTable" id="my-table-table" {
	table_head {
	    table_row {
		for {set c 0} {$c < $::cols} {incr c} {
		    table_th {
			put [string toupper [lorem 2]]
		    }
		}
	    }
	}

	table_body {
	    for {set r 0} {$r < $::rows} {incr r} {
		table_row {
		    for {set c 0} {$c < $::cols} {incr c} {
			table_data {
			    put [lorem 3]
			}
		    }
		}
	    }
	}
    }
}

######################################################
##### 
######################################################
m::proc -public dummy:form:cb {
} {
    Documentation goes here...
} {
    Trace
    
    parray ::v
}

