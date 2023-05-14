import React, { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
export default function BillCalculator() {
  const [items, setItems] = useState([
    {
      id: 0,
      name: "",
      quantity: 0,
      price: 0,
      total: 0,
    },
  ]);
  const [disableActions, setDisableActions] = useState(false);
  const [grandTotal, setGrandTotal] = useState(0);

  const handleAddItem = () => {
    setDisableActions(true);
    let itemsList = [...items];
    itemsList.push({
      id: itemsList.length,
      name: "",
      quantity: 0,
      price: 0,
      total: 0,
    });

    setItems([...itemsList]);
    setTimeout(() => {
      setDisableActions(false);
    }, [300]);
  };

  const handleDeleteItem = (id) => {
    setDisableActions(true);
    let itemsList = [...items];
    itemsList = itemsList.filter((ele) => ele.id !== id);
    setItems([...itemsList]);
    setTimeout(() => {
      setDisableActions(false);
    }, [300]);
  };

  const setHandleItemChange = (value, id, type) => {
    let itemsList = [...items];
    itemsList = itemsList.map((ele) => {
      debugger;
      if (ele.id === id) {
        switch (type) {
          case "name":
            ele.name = value;
            break;
          case "quantity":
            ele.quantity = value;
            ele.total = value * ele.price;
            break;
          case "price":
            ele.price = value;
            ele.total = value * ele.quantity;
            break;
          default:
            break;
        }
      }
      return ele;
    });

    setItems([...itemsList]);
  };

  useEffect(() => {
    let GTotal = 0;
    items.forEach((ele) => {
      GTotal = parseInt(GTotal) + parseInt(ele.total);
    });
    setGrandTotal(GTotal);
  }, [items]);
  return (
    <div className="col-xs-12">
      <div className="col-xs-12 fs-2">Bill Calculator</div>
      <div className="col-xs-12 d-flex mt-5">
        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">Sr. no</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((ele) => {
                return (
                  <tr>
                    <th>
                      <button
                        className="btn btn-danger"
                        disabled={disableActions}
                        onClick={() => {
                          handleDeleteItem(ele.id);
                        }}>
                        <AiOutlineMinusCircle style={{ marginTop: "-5px" }} />
                      </button>
                    </th>
                    <th>{ele.id}</th>
                    <th>
                      <input
                        className="form-control"
                        value={ele.name}
                        onChange={(e) => {
                          debugger;
                          if (e.target.value) {
                            setHandleItemChange(e.target.value, ele.id, "name");
                          }
                        }}></input>
                    </th>
                    <th>
                      <div class="input-group mb-3">
                        <input
                          type={"number"}
                          className="form-control"
                          value={ele.quantity}
                          onChange={(e) => {
                            setHandleItemChange(
                              e.target.value,
                              ele.id,
                              "quantity"
                            );
                          }}></input>
                        <div class="input-group-append">
                          <span class="input-group-text">×</span>
                        </div>
                      </div>
                    </th>
                    <th>
                      {" "}
                      <div class="input-group mb-3">
                        <div class="input-group-prepend">
                          <span class="input-group-text">₹</span>
                        </div>
                        <input
                          type={"number"}
                          className="form-control"
                          value={ele.price}
                          onChange={(e) => {
                            setHandleItemChange(
                              e.target.value,
                              ele.id,
                              "price"
                            );
                          }}></input>
                      </div>
                    </th>
                    <th>
                      <input
                        type={"number"}
                        className="form-control"
                        value={ele.total}
                        disabled></input>
                    </th>
                    <th>
                      <button
                        className="btn btn-success"
                        disabled={disableActions}>
                        <AiOutlinePlusCircle
                          style={{ marginTop: "-5px" }}
                          onClick={handleAddItem}
                        />
                      </button>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div className="col-xs-12 d-flex justify-content-end gap-4">
        <div className="col-xs-5">
          <input className="form-control" value={grandTotal} disabled></input>
        </div>
      </div>
    </div>
  );
}
