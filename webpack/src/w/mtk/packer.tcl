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

namespace eval packer {}

include "/tk/lib/components/w/mtk/inc/packer/packer.css"
include "/tk/lib/components/w/mtk/inc/packer/packer.js"

include "/tk/lib/components/misc/webpack/node_modules/font-awesome/css/font-awesome.min.css"

dependencies

tk::loading

######################################################
##### 
######################################################
m::proc -public packer::id {
} {
    Documentation goes here...
} {
    Trace
    
    return "packer"
}

######################################################
##### 
######################################################
m::proc -public packer::narrative {
} {
    Documentation goes here...
} {
    Trace

    put "this is our packer page"
}

######################################################
##### 
######################################################
m::proc -public packer::title {
} {
    Documentation goes here...
} {
    Trace
    
    return "packer"
}

######################################################
##### 
######################################################
m::proc -public packer::template {
} {
    Documentation goes here...
} {
    Trace

    return "template::0"
}

######################################################
##### 
######################################################
m::proc -public packer::init {
} {
    Documentation goes here...
} {    
    Trace
    variable _id [[namespace current]::id]
    
    [template]
}

######################################################
##### 
######################################################
m::proc -public packer::guts {
} {
    Documentation goes here...
} {    
    Trace
    variable _id [id]
    
    br
    division id="${_id}" {
	division class="container" {
	    division class="row" {
		division class="col-md-12" {
		    division class="alert alert-warning" {
			division class="clearfix" {
			    division class="pull-left" {
				h2 [style padding 0 margin 0] "PACKER <small>- WHEN ONE BUNDLE SIZE DOES NOT FIT THEM ALL"
			    }
			    division class="pull-right" {
				put [url "Toggle" "#" class="btn btn-warning" id="btn-toggleall"]
			    }
			}
			division class="clearfix" {
			    division class="pull-left" {
				h3 [style padding 0 margin 0] [url "Play in sandbox first <small>- some components require server for json files</small>" "/tk/lib/components/w/doc" target=_blank]
			    }
			}
		    }
		}
	    }

	    division class="row" {
		division class="col-md-12" {
		    foreach i [lsort [array names ::dep]] {
			put [url [string totitle "$i"] "#" class="btn btn-default btn-component" id="$i" aria-pressed="false"]
		    }
		}
	    }

	    division class="row" id="container-validate" [style display none] {
		division class="col-md-12" {
		    hr
		    put [url "Validate" "#" class="btn btn-info" id="btn-validate"]
		}
	    }

	    division class="row" id="container-includes" [style display none] {
		division class="col-md-12" {
		    h1 "container-includes"
		}
	    }

	    division class="row" id="container-pack" [style display none] {
		division class="col-md-12" {
		    hr
		    put [url "Pack'n Go" "#" class="btn btn-warning" id="btn-pack"]
		    space 30 0
		    put [url "Click to View" "/tk/lib/components/misc/webpack/build/index.html" class="btn btn-danger" id="btn-show" target=_blank style="display:none"]
		}
	    }

	    division class="row" id="container-results" [style display none] {
		hr
		division class="col-md-12" {
		}
	    }
	}

	javascript {
	    put {
		packer.init();
	    }
	}
    }
}

######################################################
##### 
######################################################
m::proc -public packer::includes {
} {
    Documentation goes here...
} {    
    Trace
    variable _id [id]
    
    hr
    h4 "Following packages will be included in your bundle <small>- you can deselct what you already have</small>"

    set list []
    
    foreach i $::comps {
	foreach j [split $::dep($i) ";"] {
	    foreach k $j {
		if {$k != "import"} {
		    lappend list $k
		}
	    }
	}
    }

    lappend list "jquery"

    bullet_list [style list-style none padding 0 margin 0] {
	foreach i [lsort -unique $list] {
	    li [style display inline-block margin-right 20px] "<input class='form-check-input' type='checkbox' value='$i' checked /> $i"
	}
    }
}

######################################################
##### 
######################################################
m::proc -public packer::process {
} {
    Documentation goes here...
} {
    Trace

    preformatted [style margin-bottom 100px] {
	# SET PATHS
	set react   "/Melify/mtk/dev/tk/lib/components/misc/react"
	set angular "/Melify/mtk/dev/tk/lib/components/misc/angular"
	set webpack "/Melify/mtk/dev/tk/lib/components/misc/webpack"
	set w	    "/Melify/mtk/dev/tk/lib/components/w"

	######################################################
	##### CREATE INDEX.JS FILE
	######################################################
	puts ""
	puts "> Creating index.js file..."

	set str ""
	foreach i $::comps {
	    set i [string trim $i]

	    if {[info exist ::dep($i)] == 1} {
		append str [string trim $::dep($i)]
	    } else {
		puts "ERROR: DON'T HAVE $i component yet!"
		exit
	    }
	}

	set f [open $webpack/src/.index.js r]
	set r [read $f];
	close $f
	regsub -all "<BUNDLED>" $r $str r

	set f [open $webpack/src/index.js w]
	puts $f $r;
	close $f

	######################################################
	##### CREATE INDEX.HTML FILE
	######################################################
	puts "> Creating index.html file..."

	set html ""
	foreach i $::comps {
	    set i [string trim $i]
	    set f [open $w/html/${i}.html r]
	    
	    while {[gets $f line] >= 0} {
		if {[string first "<!-- SAMPLE -->" $line] != -1} {
		    break
		}
	    }
	    
	    while {[gets $f line] >= 0} {
		if {[string first "<!-- SAMPLE -->" $line] == -1} {
		    if {[string first "<!--" $line] == -1} {
			append html "$line\n"
		    }
		} else {
		    break
		}
	    }
	    
	    append html "<hr/>\n"
	}

	# 1; WEBPACK
	################################################
	set f [open $webpack/src/.index.html r]
	set r [read $f]
	close $f

	regsub "<HTMLCODE/>" $r "$html" r

	set f [open $webpack/src/index.html w]
	puts $f $r
	close $f

	# 1: REACT
	################################################
	set f [open $react/src/.App.js r]
	set r [read $f]
	close $f

	regsub -all "<!--" $html "// <!--" html

	regsub "<HTMLCODE/>" $r "$html" r

	set f [open $react/src/App.js w]
	puts $f $r
	close $f

	# 1: ANGULAR
	################################################
	set f [open $angular/app/view1/.view1.html r]
	set r [read $f]
	close $f

	regsub -all "<!--" $html "// <!--" html

	regsub "<HTMLCODE/>" $r "$html" r

	set f [open $angular/app/view1/view1.html w]
	puts $f $r
	close $f

	######################################################
	##### CREATE INDEX.HTML FILE
	######################################################
	puts "> Creating bundle file..."

	cd $webpack;file delete -force build

	set ::env(PATH) $::env(PATH):/usr/local/bin

	if {[catch {
	    exec npm run build
	} e] != 0} {
	    if {[file exist $webpack/build/index.html] == 0} {
		javascript {
		    put {
			alert("WEBPACK FAILED TO CREATE BUNDLE")
		    }
		}

		p [style background yellow color red] $e
	    } else {
		p $e
	    }
	}

	javascript {
	    put {
		$("#btn-show").show();
	    }
	}

	# if {[catch {
	#     # ADD STUFF TO bundle.js
	#     file:write /tmp/_z1 {
	# 	/* eslint-disable-next-line */
	# 	/* eslint-disable */
	# 	if (typeof wcENV === 'undefined') {wcENV = 'dev'}
	# 	if (typeof wcAPP === 'undefined') {wcAPP = 'NOT-SET'}
	# 	if (typeof wcURL === 'undefined') {wcURL = 'NOT-SET'}
	#     }
	    
	#     file copy /Melify/mtk/dev/tk/lib/components/misc/webpack/build/bundle.js /tmp/_z2
	#     exec cat /tmp/_z1 /tmp/_z2 > /Melify/mtk/dev/tk/lib/components/misc/webpack/build/bundle.js
	#     file delete -force /tmp/_z1 /tmp/_z2

	#     javascript {
	# 	put {
	# 	    $("#btn-show").show();
	# 	}
	#     }
	# } e] != 0} {
	#     put "<script>alert('$e')</script>"
	# }
    }
}
