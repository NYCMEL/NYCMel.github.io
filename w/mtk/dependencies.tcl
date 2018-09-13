proc dependencies {} {
    upvar dep dep

    ######################################################
    ##### LOAD COMPONENT DEPENDENCIES
    ######################################################
    set files [glob /Melify/mtk/dev/tk/lib/components/w/html/*.html]

    foreach fname $files {
	set name [file rootname [file tail $fname]]
	if {[string index $name 0] == "_"} {
	    continue
	}
	
	set f [open $fname r]
	while {[gets $f line] >= 0} {
	    if {[string first " nope" $line] != -1} {
		break
	    }
	}

	set s [string trim [lindex [split $line ":"] 1]]
	set s [string range [string trim $s] 1 end-2]

	regsub -all "'" $s "" s
	regsub -all "," $s "" s
	regsub -all "../js/" $s "" s
	regsub -all ".js" $s "" s

	set comps [split $s]

	lappend ::auto_path ../req

	set tmp [list]
	foreach i $comps {
	    if {[string trim $i] == ""} {
		continue
	    }

	    set file /Melify/mtk/dev/tk/lib/components/misc/webpack/src/w/req/$i.tcl

	    if {[file exist $file] == 1} {
		source $file
	    } else {
		set req($i) [subst {
		    import "./w/scss/_$i.scss";
		    import "./w/js/$i";
		}]
	    }

	    append tmp $req($i)\n
	}

	set dep($name) $tmp
    }
}
