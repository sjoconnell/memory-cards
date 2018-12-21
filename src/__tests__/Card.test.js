import React from "react";
import { create } from "react-test-renderer";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Card from "../components/Card";

configure({ adapter: new Adapter() });

test("Card snapshot", () => {
  const c = create(<Card />);
  expect(c.toJSON()).toMatchSnapshot();
});

test("Should call handleCardClick function when clicking Card", () => {
  const clickCard = jest.fn();
  const wrapper = shallow(<Card handleCardClick={clickCard} />);
  const div = wrapper.find(".card");
  div.simulate("click");
  expect(clickCard).toHaveBeenCalledTimes(1);
});

test("Should not call handleCardClick when disabled is true", () => {
  const clickCard = jest.fn();
  const wrapper = shallow(<Card handleCardClick={clickCard} disabled={true} />);
  const div = wrapper.find(".card");
  div.simulate("click");
  expect(clickCard).toHaveBeenCalledTimes(0);
});

test("Should not call handleCardClick when flipped is true", () => {
  const clickCard = jest.fn();
  const wrapper = shallow(<Card handleCardClick={clickCard} flipped={true} />);
  const div = wrapper.find(".card");
  div.simulate("click");
  expect(clickCard).toHaveBeenCalledTimes(0);
});

test("Should not call handleCardClick when matched is true", () => {
  const clickCard = jest.fn();
  const wrapper = shallow(<Card handleCardClick={clickCard} matched={true} />);
  const div = wrapper.find(".card");
  div.simulate("click");
  expect(clickCard).toHaveBeenCalledTimes(0);
});
