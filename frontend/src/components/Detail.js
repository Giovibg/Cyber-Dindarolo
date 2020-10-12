import React, { Component } from 'react'
import "./Detail.css"
import SkyLight from 'react-skylight';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    
}

componentDidMount(){
  this.customDialog.show();
}
      render(){
        var modalStyle = {
          backgroundColor: '#282828',
          opacity:'0.95',
          color: '#ffffff',
          width: '75%',
          height: '600px',
          marginTop: '-300px',
          marginLeft: '-35%',
          padding: '50px',
          position: 'fixed'
          
        };
        return(
            <SkyLight dialogStyles={modalStyle} hideOnOverlayClicked ref={ref => this.customDialog = ref} title="Detail">
                <div className="Details">
                <div className="history__info">
                <h4>Product</h4>
                <h4>Unit Price</h4>
                <h4>quantity</h4>
                <h4>type</h4>
                <h4>currency</h4>
                <h4>date</h4>
                <h4>subtotal</h4>
              </div>
              
              
              <hr className="history_line" />
            
              
              
              <tr className="detail__table">
                <td className="detail__element">{this.props.transact.product_name}</td>
                <td className="detail__element">{this.props.transact.unit_price}</td>
                <td className="detail__element">{this.props.transact.quantity}</td>
                <td className="detail__element">{this.props.transact.trans_type}</td>
                <td className="detail__element">{this.props.transact.currency}</td>
                <td className="detail__element">{(this.props.transact.transaction_timestamp).substring(0, 10)}</td>
                <td className="detail__element">{this.props.transact.subtotal}</td>
                
              </tr>
              
                </div>
             </SkyLight>
        );
        }
}
export default Detail