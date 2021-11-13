import React from 'react';
import ReactDOM from 'react-dom';

function MorseCodes() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">MorseCodes Component</div>

                        <div className="card-body">I'm an MorseCodes component!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MorseCodes;

if (document.getElementById('content')) {
    ReactDOM.render(<MorseCodes />, document.getElementById('content'));
}
