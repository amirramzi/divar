"use client";
import Table from "@/app/components/shared/Table";
import CategoryHaveOptionsTableColumns from "./CategoryHaveOptionsTableColumns";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import callApi from "@/services/callApi";
import { setCategoryLastChild } from "@/store/slice/CategoryAdminSlice";

const CategoryHaveOptionsTable = ({
  handleOptionClick,
  handleAddOptionClick,
  handleDelete,
  handleSave,
}) => {
  const lastCategory = useSelector((state) => state.categoryAdmin.lastChild);
  const [house, setHouse] = useState([]);
  const [car, setCar] = useState([]);
  const [digital, setDigital] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [services, setServices] = useState([]);
  const [personal, setPersonal] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [social, setSocial] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [recruitment, setRecruitment] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLastCategories = async () => {
      try {
        const result = await callApi().get("/category/last-category");
        dispatch(setCategoryLastChild(result?.data?.categories));
      } catch (error) {
        console.log(error);
      }
    };
    fetchLastCategories();
  }, [dispatch]);

  useEffect(() => {
    if (lastCategory) {
      const houseCategories = [];
      const carCategories = [];
      const digitalCategories = [];
      const kitchenCategories = [];
      const servicesCategories = [];
      const personalCategories = [];
      const entertainmentCategories = [];
      const socialCategories = [];
      const equipmentCategories = [];
      const recruitmentCategories = [];

      lastCategory.forEach((category) => {
        switch (category?.icon) {
          case "house":
            houseCategories.push(category);
            break;
          case "car":
            carCategories.push(category);
            break;
          case "Digital":
            digitalCategories.push(category);
            break;
          case "kitchen":
            kitchenCategories.push(category);
            break;
          case "Services":
            servicesCategories.push(category);
            break;
          case "personal":
            personalCategories.push(category);
            break;
          case "Entertainment":
            entertainmentCategories.push(category);
            break;
          case "social":
            socialCategories.push(category);
            break;
          case "equipment":
            equipmentCategories.push(category);
            break;
          case "Recruitment":
            recruitmentCategories.push(category);
            break;
          default:
            break;
        }
      });

      setHouse(houseCategories);
      setCar(carCategories);
      setDigital(digitalCategories);
      setKitchen(kitchenCategories);
      setServices(servicesCategories);
      setPersonal(personalCategories);
      setEntertainment(entertainmentCategories);
      setSocial(socialCategories);
      setEquipment(equipmentCategories);
      setRecruitment(recruitmentCategories);
    }
  }, [lastCategory]);

  const columns = CategoryHaveOptionsTableColumns(
    handleOptionClick,
    handleAddOptionClick
  );

  const allRows = [
    { name: "املاک", row: house },
    { name: "وسیله نقلیه", row: car },
    { name: "کالای دیجیتال", row: digital },
    { name: "خانه و آشپزخانه", row: kitchen },
    { name: "خدمات", row: services },
    { name: "وسایل شخصی", row: personal },
    { name: "سرگرمی و فراغت", row: entertainment },
    { name: "اجتماعی", row: social },
    { name: "تجهیزات و صنعتی", row: equipment },
    { name: "استخدام و کاریابی", row: recruitment },
  ];

  return (
    <div className="space-y-10">
      {allRows.map((item, index) => (
        <div
          key={index}
          className="w-full flex flex-col space-y-4 justify-center items-center "
        >
          <h1 className="text-gray-200 font-bold text-4xl">{item.name}</h1>
          <div className="w-[67%] ">
            <Table
              columns={columns}
              rows={item.row}
              page={0}
              pageSize={5}
              getRowId={(row) => row._id}
              onDelete={handleDelete}
              onSave={handleSave}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryHaveOptionsTable;
