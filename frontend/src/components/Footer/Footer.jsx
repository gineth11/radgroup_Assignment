import React from 'react';
import './Footer.css';



export function Footer() {
    return (
        <div className='footer-container'>
            <section className= 'footer-input'>

                <p className ='footer-heading'>
                    Sign up to receive updates, special offers, <br/>
                    program communications and other information from EUDORA
                </p>
                <p>  Contact Us  </p>



                <div className="footer-icon">


                    <i className="fa fa-envelope fa-2x" aria-hidden="true"></i> &nbsp;{"   "}&nbsp;
                    <i className="fa fa-facebook-official fa-2x" aria-hidden="true" ></i>&nbsp;{"   "}&nbsp;
                    <i className="fa fa-twitter fa-2x" aria-hidden="true"> </i> {"   "}&nbsp;
                    <i className="fa fa-instagram fa-2x" aria-hidden="true"></i> {"   "}

                </div>

            </section>

        </div>
    );
}
