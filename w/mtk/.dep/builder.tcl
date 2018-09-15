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

namespace eval builder {}

include "https://cdnjs.cloudflare.com/ajax/libs/jquery.gridster/0.5.6/jquery.gridster.css"
include "https://cdnjs.cloudflare.com/ajax/libs/jquery.gridster/0.5.6/jquery.gridster.js"

include "/GitHub/underscore/underscore.js"
include "/GitHub/gridster-bootstrap/gridster-bootstrap.js"

include "/tk/lib/components/w/mtk/inc/builder/builder.css"
include "/tk/lib/components/w/mtk/inc/builder/builder.js"

include "/tk/lib/components/misc/webpack/build/bundle.js"

######################################################
##### 
######################################################
m::proc -public builder::id {
} {
    Documentation goes here...
} {
    Trace
    
    return "builder"
}

######################################################
##### 
######################################################
m::proc -public builder::narrative {
} {
    Documentation goes here...
} {
    Trace

    put "this is our builder page"
}

######################################################
##### 
######################################################
m::proc -public builder::title {
} {
    Documentation goes here...
} {
    Trace
    
    return "builder"
}

######################################################
##### 
######################################################
m::proc -public builder::template {
} {
    Documentation goes here...
} {
    Trace

    return "template::0"
}

######################################################
##### 
######################################################
m::proc -public builder::init {
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
m::proc -public builder::guts {
} {
    Documentation goes here...
} {    
    Trace
    variable _id [id]
    
    br

    division id="${_id}" {
	builder::panel:left
	builder::panel:right
	builder::toolbar

	division class="container-fluid" {
	    division class="row" {
		division class="col-md-12 gridster" {
		    set r 0

		    bullet_list {
			# incr r
			# set c 4
			# foreach i {1 2 3} {
			#     li data-row="$r" data-col="$i" data-sizex="$c" data-sizey="2" "$i - $c"
			# }

			# incr r
			# set c 6
			# foreach i {1 2} {
			#     li data-row="$r" data-col="$i" data-sizex="6" data-sizey="2" "$i - $c"
			# }
			
			# incr r
			# set c 1
			# foreach i {1 2 3 4 5 6 7 8 9 10 11 12} {
			#     li data-row="$r" data-col="$i" data-sizex="1" data-sizey="1" "$i - $c"
			# }
		    }
		}
	    }
	}

	division class="container-fluid" id="${_id}-saved" [style display block] {
	    division class="row" {
		division class="col-md-12" {
		    put [subst {
			<h2>SERIALIZED</h2>
			<textarea id="${_id}-log" style="height:100px;width:100%"></textarea>

			<hr>
			<h2>HTML</h2>
			<textarea id="${_id}-bs-log" style="height:100px; width:100%;"></textarea>
			
			<h2>VIEW</h2>
			<div id="${_id}-grids"></div>
		    }]
		}
	    }
	}

	javascript {
	    put {
		builder.init()
	    }
	}
    }
}

######################################################
##### 
######################################################
m::proc -public builder::panel:left {
} {
    Documentation goes here...
} {    
    Trace
    variable _id [id]

    division id="panel-left" {
	bullet_list class="list-group" {
	    foreach i [lsort [glob /Melify/mtk/dev/tk/lib/components/w/html/*.html]] {
		set cname [file rootname [file tail $i]]
		if {[string index $cname 0] == "_"} {
		    continue
		}

		put [url "[string totitle $cname]" "#" class="list-group-item" comp="$cname"]
	    }
	}
    }
}

######################################################
##### 
######################################################
m::proc -public builder::panel:right {
} {
    Documentation goes here...
} {    
    Trace
    variable _id [id]

    division id="panel-right" {
	p "Component Spec.<BR><small> can be adjustes via parameters</small>"
    }
}

######################################################
##### 
######################################################
m::proc -public builder::toolbar {
} {
    Documentation goes here...
} {    
    Trace
    variable _id [id]

    division id="${_id}-toolbar" {
	division {
	    put [url "<i class='fa fa-plus-circle'></i>" "#" id="add-one"]
	}
	division {
	    put [url "<i class='fa fa-save'></i>" "#" id="save-one"]
	}
	division {
	    put [url "<i class='fa fa-code'></i>" "#" id="html-one"]
	}
	division {
	    put [url "<i class='fa fa-eye'></i>" "#" id="view-one"]
	}
    }
}

######################################################
##### 
######################################################
m::proc -public builder::dummy {
} {
    Documentation goes here...
} {    
    Trace
    variable _id [id]

    switch $::comp {
	"maker" {
	    put {
		<wc-maker class="" id="my-maker-1" uparam="{from:'Mel Heravi', to:'You', link:'http://www.melify.com'}" header="I AM A <u>DEFAULT</u> TEMPLATE">
		<!-- "uparam" RETURNED IN SUBSCRIPTION -->
		<h4><i class="fa fa-info-circle"></i> Used by maker to create consistent components</h4>
		<p>you can click on me to get a callback</p>
		</wc-maker>

	    }
	}
	"card" {
	    put {
		<wc-card id="my-card-1">
		<wc-card-header>
		Card Header (image top)
		</wc-card-header>

		<wc-card-img position="top">
		<img src="http://localhost/tk/lib/components/w/img/tmp/12s.jpg" width="100%" />
		</wc-card-img>

		<wc-card-body>
		Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt 
		sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren
		</wc-card-body>

		<wc-card-footer>
		Card Footer
		</wc-card-footer>
		</wc-card>
	    }
	}
	"carousel" {
	    put {
		<wc-carousel id="my-carousel-1" options='{"slidesToShow":3, "autoplay":true, "dots":true, "speed":1000, "initialSlide":0}'>
		<div><a href="#"><img src="http://localhost/tk/img/business/png/cart-10.png"	   width="300" slick-caption="Picture A" alt="Picture A" /></a></div>
		<div><a href="#"><img src="http://localhost/tk/img/business/png/barcode.png"	   width="300" slick-caption="Picture B" alt="Picture B" /></a></div>
		<div><a href="#"><img src="http://localhost/tk/img/business/png/calculator.png"	   width="300" slick-caption="Picture C" alt="Picture C" /></a></div>
		<div><a href="#"><img src="http://localhost/tk/img/business/png/bag-6.png"	   width="300" slick-caption="Picture D" alt="Picture D" /></a></div>
		<div><a href="#"><img src="http://localhost/tk/img/business/png/coin-10.png"	   width="300" slick-caption="Picture E" alt="Picture E" /></a></div>
		<div><a href="#"><img src="http://localhost/tk/img/business/png/credit-card-1.png" width="300" slick-caption="Picture F" alt="Picture F" /></a></div>
		</wc-carousel>
	    }
	}
	"listbox" {
	    put {
		<wc-listbox id="my-listbox" width="400px">
		<ul class="list-group">
		<li id="item-1" class="list-group-item">First item</li>
		<li id="item-2" class="list-group-item active">Second item</li>
		<li id="item-3" class="list-group-item">Third item</li>
		<li id="item-4" class="list-group-item">Fourth item</li>
		<li id="item-5" class="list-group-item">Fifth item</li>
		</ul>
		</wc-listbox>
	    }
	}
	default {
	    h4 [style margin 0 padding 0] "[string toupper $::comp] <small>unavailable</small>"
	    put [lorem [math::random 20 100]]
	}
    }
}
