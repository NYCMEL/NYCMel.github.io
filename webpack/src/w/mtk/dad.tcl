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

namespace eval dad {}

######################################################
##### 
######################################################
m::proc -public dad::init {
} {
    Documentation goes here...
} {
    Trace

    division [style width 300px border "1px red solid"] {
	division [style padding 10px background #333 color #FFF height 30px] class="clearfix" {
	    put [clock seconds]
	}
	
	division [style padding 10px height 170px background #FFF] class="clearfix" {
	    put [lorem 20]
	}
    }
}

