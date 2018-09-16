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

namespace eval designer {}

include "/Melify/mtk/dev/tk/jquery/scripts/jquery-3.2.1.min.js"
include "/GitHub/gridstrap.js/dist/jquery.gridstrap.css"
include "/GitHub/gridstrap.js/dist/jquery.gridstrap.js"

######################################################
##### 
######################################################
m::proc -public designer::id {
} {
    Documentation goes here...
} {
    Trace

    return "designer"
}

######################################################
##### 
######################################################
m::proc -public designer::narative {
} {
    Documentation goes here...
} {
    Trace

    put "<b>designer::narative below...</b>";br
    tk::dummy::3 -size 0
}

######################################################
##### 
######################################################
m::proc -public designer::title {
} {
    Documentation goes here...
} {
    Trace

    return "Designer"
}

######################################################
##### 
######################################################
m::proc -public designer::init {
} {
    Documentation goes here...
} {
    Trace

    button "TOGGLE" class="btn btn-warning" onclick="designer.toggle()"

    set cnt 0

    br
    division class="container" {
	division class="row" {
	    foreach i {1 2 3 4} {
		division class="col-md-3" {
		    h4 "[incr cnt]: [string toupper [lorem 3]]"
		    p [lorem 50]
		}
	    }
	}
	division class="row" {
	    division class="col-md-6" {
		h4 "[incr cnt]: [string toupper [lorem 3]]"
		p [lorem 50]
	    }
	    division class="col-md-3" {
		h4 "[incr cnt]: [string toupper [lorem 3]]"
		p [lorem 50]
	    }
	    division class="col-md-3" {
		h4 "[incr cnt]: [string toupper [lorem 3]]"
		p [lorem 50]
	    }
	}

	division class="row" {
	    division class="col-md-5" {
		h4 "[incr cnt]: [string toupper [lorem 3]]"
		p [lorem 50]
	    }
	    division class="col-md-3" {
		h4 "[incr cnt]: [string toupper [lorem 3]]"
		p [lorem 50]
	    }
	    division class="col-md-4" {
		h4 "[incr cnt]: [string toupper [lorem 3]]"
		p [lorem 50]
	    }
	}
    }
}
