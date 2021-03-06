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
    this.dialogWithCallBacks.show();
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
        <SkyLight  dialogStyles={modalStyle}
          afterClose={this.props.action} 
          hideOnOverlayClicked ref={ref => this.dialogWithCallBacks = ref} 
          title="Detail">
            
          <div className="Details">
            <table className="table">
              <tbody>
                <tr className="detail__info">
                  <td>Product</td>
                  <td>Unit Price</td>
                  <td>quantity</td>
                  <td>date</td>
                  <td>subtotal</td>
                </tr>
          
                <tr className="">
                  <td className="detail__element">{this.props.transact.product_name}</td>
                  <td className="detail__element">{this.props.transact.unit_price}</td>
                  <td className="detail__element">{this.props.transact.quantity}</td>
                  <td className="detail__element">{(this.props.transact.transaction_timestamp).substring(0, 10)}</td>
                  {this.props.transact.subtotal < 0 && (
                    <td className="detail__element_n">{this.props.transact.subtotal} €</td>
                  )}
                 {this.props.transact.subtotal > 0 && (
                    <td className="detail__element_p">+{this.props.transact.subtotal} €</td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </SkyLight>   
    );
  }
}
export default Detail