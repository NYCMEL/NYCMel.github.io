#!/Melify/bin/mac/tclkit

proc camelcase {sentence} {
    subst -nobackslashes -novariables [regsub -all {\S+} $sentence {[string totitle &]}]
    return $sentence
}

# PREPARE CSV
foreach i [glob data/matrix-*.xlsx] {
    exec xlsx2csv $i
}

foreach i [glob data/matrix-*.csv] {
    puts -nonewline "PROCESSING: $i";flush stdout;

    set f [open $i r]
    
    #FIND ITEMS
    set h ",Compound Return 2018 (%),Arithmetic Return 2018 (%),Annualized Volatility (%),Compound Return 2017 (%)"

    while {[gets $f line] >= 0} {
	if {[string first "Fixed Income" $line] >= 0} {
	    break
	}
    }

    set fo [open $i.processed w]
    puts $fo $line

    while {[gets $f line] >= 0} {
	puts $fo $line
    }
    
    close $fo
    close $f

    # PROCESS FILES

    set f [open $i.processed r]

    set str "<table><thead><tr>"

    set c -1
    foreach j [split $h ,] {
	incr c
	append str "<th row='0' col='$c'>$j</th>"
    }
    
    append str "</tr></thead><tbody>"

    set r 0
    while {[gets $f line] >= 0} {
	if {[string trim $line] == ""} {
	    continue
	}

	incr r
	set c -1
	append str "<tr>"

	foreach j [split $line ,] {
	    incr c
	    if {[catch {
		set num [format {%0.2f} $j]
	    } e] != 0} {
		set num $j
	    }

	    if {$c == 0} {
		if {$num != ""} {
		    if {$num == "Alternatives"} {
			set num "Alts"
		    }

		    set k $num
		} else {
		    set num $k
		}
	    }
	    if {$c == 1} {
		set num [camelcase $num]
	    }

	    append str "<td row='$r' col='$c'><div>$num</div></td>"
	}

	# incr c
	# for {set k $c} {$k < 59} {incr k} {
	#     append str "<td row='$r' col='$k'></td>"
	# }

	append str "</tr>"
    }

    append str "</tbody></table>"

    close $f
    regsub ".csv" $i ".html" i

    set f [open $i w]
    puts $f $str
    close $f

    puts "...DONE"
}

foreach i [glob data/matrix-*.csv.processed] {
    file delete $i
}

foreach i [glob data/matrix-*.csv] {
    file delete $i
}
