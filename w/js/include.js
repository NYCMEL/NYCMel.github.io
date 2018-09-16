/**
 * Include Component<BR>
 * <BR><BR><a href="../html/include.html">DEMO</a>
 */
class Include extends HTMLElement {
    constructor() {
        console.group("Include.constructor")
	
        super();

        console.groupEnd();
    };
    
    /**
     * This function is called when this is attached to DOM
     * @connectedCallback. 
     */
    connectedCallback() {
        console.group("Include.connectedCallback")
	
	let href = $(this).attr("href");
	let par  = $(this).parent();

	// ADD LOADING IMAGE
	$(par).html("<span class='wc-loading-img'></span>");

	if (href) {
	    let xhttp = new XMLHttpRequest();

	    xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
		    //alert(this.responseText)
		    if (this.status == 200) {$(par).html(this.responseText)}
		    if (this.status == 404) {$(par).html("wc-include: Page not found: " + href)}
		}
	    }      

	    xhttp.open("GET", href, true);
	    xhttp.send();
	}

        console.groupEnd();
    };
}

window.customElements.define('wc-include', Include);
