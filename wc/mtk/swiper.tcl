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

namespace eval swiper {}

division class="hamberger" {
    put "<i class='fa fa-bars fa-2x'></i>"
}

######################################################
##### 
######################################################
m::proc -public swiper::0 {
} {
    Documentation goes here...
} {    
    Trace

    include "/tk/lib/components/w/mtk/inc/swiper.css"
    include "/tk/lib/components/w/mtk/inc/swiper.js"

    br;br
    division id="swiper-0" class="a-swiper" {
	division class="container menus" {
	    division class="row" {
		division class="col-md-4" {
		    division {
			h3 MENUS

			bullet_list {
			    li class="pager" ind="1" {
				Home
			    }

			    li class="pager" ind="2" {
				Videos
			    }

			    li class="pager" ind="3" {
				Long Page
			    }
			    
			    li class="pager" ind="4" {
				Embeded PDF
			    }

			    li class="addone" {
				<font color=skyblue>Add One More ...</font>
			    }
			}
		    }
		}

		foreach i {1 2} {
		    division class="col-md-4" {
			division {
			    h3 "Menus - $i"

			    bullet_list [subst {
				li {
				    [lorem 3]
				}

				li {
				    [lorem 3]
				}

				li {
				    [lorem 3]
				}
				
				li {
				    [lorem 3]
				}
			    }]
			}
		    }
		}
	    }

	    # hr
	    # br
	    # division class="row" {
	    # 	division class="col-md-12" {
	    # 	    division class="alert alert-warning" {
	    # 		put {
	    # 		    All the links will be showin here (in a tree like manner) and the visited pages will be marked
	    # 		    accordingly.
	    # 		    <BR>
	    # 		    Users can come back to this page using a "Hamberger" menu that will be omni present
	    # 		    on all pages.
	    # 		}
	    # 	    }
	    # 	}
	    # }
	}
    }
}

######################################################
##### 
######################################################
m::proc -public swiper::1 {
} {
    Documentation goes here...
} {    
    Trace
    
    division id="swiper-1" class="a-swiper" [style margin-top 40px] {
	division class="container" {
	    division class="row" {
		division class="col-md-7" {
		    h1 "WELCOME <i class='fa fa-smile-o'></i>"
		    br
		    p style="text-transform:uppercase" [lorem 50]

		}
		division class="col-md-5" {
		    put [subst {
			<ul class="list-group">
			<li class="list-group-item"><a href="#" ind="2" class="pager">Scrollable Page</a></li>
			<li class="list-group-item"><a href="#" ind="3" class="pager">Embeded PDF</a></li>
			</ul>
		    }]
		}
	    }

	    br;br

	    division class="row" {
		division class="col-md-7" {
		    set url [url [img /tk/lib/components/w/mtk/img/play.png width=150] "#" ind="2" class="pager"]
		    h2 "$url WATCH"
		}
		division class="col-md-5" {
		    put [img /tk/lib/components/w/mtk/img/swipe.png width=150]
		}
	    }

	    division class="row" id="disclaimer" {
		division class="col-md-12" {
		    division class="alert alert-success" {
			put {
			    <strong>This is your last chance:</strong><br>
			    After this, there is no turning back. You take the <font color="blue">BLUE</font> pill—the story ends,
			    you wake up in your bed and believe whatever you want to believe. You take the <font color="red">RED</font> pill—you stay in Wonderland,
			    and I show you how deep the rabbit hole goes.
			    <br>
			    Remember: all I'm offering is the truth. Nothing more.
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
m::proc -public swiper::2 {
} {
    Documentation goes here...
} {    
    Trace
    
    division id="swiper-2" class="a-swiper" {
	division class="container" {
	    division class="row" {
		division class="col-md-12" {
		    division {
			h2 "MARTIANS <small>- THAT SITE IN 15 MINS. <i class='fa fa-smile-o'></i></small>"

			put {
			    <video autoplay loop muted playsinline width=100%>
			    <source src="http://www.melify.com/videos/Demo/3.Demo.mp4"  type="video/mp4">
			    <source src="http://www.melify.com/videos/Demo/3.Demo.ogg"  type="video/ogg">
			    <source src="http://www.melify.com/videos/Demo/3.Demo.webm" type="video/webm">
			    </video>
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
m::proc -public swiper::3 {
} {
    Documentation goes here...
} {    
    Trace
    
    division id="swiper-3" class="a-swiper" {
	division class="container" {
	    division class="row" {
		division class="col-md-12" {
		    division {
			h3 class="page-header" "SCROLLABLE PAGE"
			
			division {
			    tk::dummy::3
			    tk::dummy::2
			    tk::dummy::1
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
m::proc -public swiper::4 {
} {
    Documentation goes here...
} {    
    Trace
    
    division id="swiper-4" class="a-swiper" {
	division class="container" {
	    division class="row" {
		division class="col-md-12" {
		    division {
			h3 class="page-header" "EMBEDED PDF"
			
			put {
			    <!-- <iframe src="/Melify//mtk/dev/tk/img/media/license/license.pdf#toolbar=0&navpanes=0&scrollbar=0" width="100%" height="100%"></iframe> -->
			    <embed src="/Melify//mtk/dev/tk/img/media/license/license.pdf#toolbar=0&navpanes=0&scrollbar=0" width="100%" style="height:1200px"/>
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
m::proc -public swiper::more {
} {
    Documentation goes here...
} {    
    Trace
    
    division class="container" [style margin-top 40px] {
	division class="row" {
	    division class="col-md-12" {
		division {
		    h3 class="page-header" "JUST ADDED"
		    h4 [clock format [clock seconds]]
		    hr
		    tk::dummy::3
		}
	    }
	}
    }
}

