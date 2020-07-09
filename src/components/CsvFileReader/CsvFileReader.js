import React, { Component } from 'react';
//import r from '../../../files/'
import CSVReader from 'react-csv-reader'
import OrderDetails from '../OrderDetails/OrderDetails';
import './CsvFileReader.css';

class CsvFileReader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            details: [],
            filterDetails: [],
            pincode: null,
            date: null,
            item: null
        }
    }


    fileHandler(data, fileInfo) {
        this.setState({ details: data })
    }

    pincodeHandler = event => {
        let pincode = event.target.value
        this.setState({ pincode: event.target.value })
        console.log(this.state.pincode)
    }

    dateHandler = event => {
        this.setState({ date: event.target.value })
        console.log(this.state.date)
    }

    pincodeButtonHandler = () => {
        let allDetails = [...this.state.details];
        console.log(this.state.date)
            let pincodeOrders = allDetails.filter(pin => {
                return pin.deliverypincode == this.state.pincode
            })
            //console.log(pincodeOrders)

            this.setState({ filterDetails: pincodeOrders })
    }

    dateButtonuttonHandler = () => {
        let allDetails = [...this.state.details]
            let dateOrders = allDetails.filter(date => {
                return date.orderdate == this.state.date
            })
            //console.log(dateOrders)
            this.setState({ filterDetails: dateOrders })
    }

    ordersButtonHandler = () => {
        let orderDetails = [...this.state.details]
        this.setState({ filterDetails: orderDetails })
    }

    itemSearchHandler = event => {
        this.setState({ item: event.target.value })
    }

    itemButtonHandler = () => {
        let allDetails = [...this.state.details];
        //console.log(this.state.item) 
        let itemOrders = allDetails.filter(item =>{
           return item.items.includes(this.state.item)
        })
        this.setState({filterDetails: itemOrders})
    }


    itemHandler(item) {
        //console.log(item)
        let result = item.split(';')
        result.pop();
        //console.log(result);
        return (
            <div>
                {result.map((res, index) => {
                    let eachItem = res.split(':')
                    //console.log(eachItem)
                    return (
                        <div>
                            {eachItem[0] + '-' + eachItem[1]}
                        </div>);
                })}
            </div>

        );
    }

    render() {
        const papaparseOptions = {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: header =>
                header
                    .toLowerCase()
                    .replace(/\W/g, '_')
        }
        return (
            <div>
                <CSVReader
                    onFileLoaded={this.fileHandler.bind(this)}
                    cssClass="csv-reader-input"
                    label="Select CSV with secret Death Star statistics"
                    parserOptions={papaparseOptions}
                    inputId="ObiWan"
                    inputStyle={{ color: 'red' }}
                />
                <div className='block'>
                    <button onClick={this.ordersButtonHandler}>View All Orders</button>
                    Pin Code:
                    <input type='text' onChange={this.pincodeHandler} />
                    <button onClick={this.pincodeButtonHandler}>SUBMIT</button>
                    Date:
                    <input type='text' onChange={this.dateHandler} />
                    <button onClick={this.dateButtonuttonHandler}>SUBMIT</button>
                    Item:
                    <input type='text' onChange={this.itemSearchHandler} />
                    <button onClick={this.itemButtonHandler}>SEARCH</button>
                </div>
                {this.state.details ? this.handler() : null}
            </div>


        );

    }
    handler() {
        return (
            <div className='container'>
                <table>
                    <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Cust Id</th>
                        <th>Pin Code</th>
                        <th>Order Date</th>
                        <th>Items</th>
                    </tr>
                    </thead>
                    {this.state.filterDetails.length > 0 ? this.state.filterDetails.map((detail, index) => {
                        //console.log(detail.orderid)
                        return (
                            <tr>
                                <td>{detail.orderid}</td>
                                <td>{detail.customerid}</td>
                                <td>{detail.deliverypincode}</td>
                                <td>{detail.orderdate}</td>
                                <td>
                                    {this.itemHandler(detail.items)}
                                </td>

                            </tr>

                        );
                    }) : <h1>No Orders</h1>}

                </table>

            </div>
        );
    }



}

export default CsvFileReader;