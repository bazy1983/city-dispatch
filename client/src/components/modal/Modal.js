import React from "react";
import { deflate } from "zlib";

const Modal = ()=>(
<div>
  <div id="modal1" className="modal">
    <div className="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div className="modal-footer">
      <a className="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
</div>

  
)

export default Modal;