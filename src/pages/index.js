import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const Home = () => {
  const [STEP_1, STEP_2, STEP_3, STEP_4, STEP_5] = [1, 2, 3, 4, 5];
  const CURRENCY = "$"
  const [step, setStep] = useState(STEP_1);

  // STEP 1 CODE
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phoneNumber: Yup.string()
        .matches(/^\d{11}$/, 'Invalid phone number')
        .required('Phone number is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission logic here
      setStep(STEP_2)
      console.log(values);
    },
  });

  // STEP 2 CODE
  const [selectedPlan, setSelectedPlan] = useState('arcade');
  const [selectedPlanValue, setSelectedPlanValue] = useState(9);
  const [isToggled, setIsToggled] = useState(false);

  const plans = isToggled
    ? {
      arcade: 90,
      advanced: 120,
      pro: 150
    }
    : {
      arcade: 9,
      advanced: 12,
      pro: 15
    };

  const duration = isToggled ? 'yr' : 'mo';
  const montlyOrYearly = isToggled ? 'Yearly' : 'Monthly';
  const handleCheckboxChange = () => {
    setIsToggled((prev) => !prev);
  };

  const handlePlanSelection = (plan, value) => {
    setSelectedPlan(plan);
    setSelectedPlanValue(value);
    // console.log("After setting", selectedPlan, selectedPlanValue)
  };

  // STEP 3 CODE
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleFeatureSelection = (feature) => {
    const isSelected = selectedFeatures.some((selected) => selected.feature === feature.feature);

    if (isSelected) {
      setSelectedFeatures(selectedFeatures.filter((selected) => selected.feature !== feature.feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }

  };


  const featureValues = isToggled ? {
    onlineService: 10,
    largerStorage: 20,
    customProfile: 20
  } : {
    onlineService: 1,
    largerStorage: 2,
    customProfile: 2
  };

  // console.log(featureValues);

  const featureData = [
    { feature: 'Online service', description: 'Access to multiplayer games', value: featureValues.onlineService },
    { feature: 'Larger Storage', description: 'Extra 1TB of cloud save', value: featureValues.largerStorage },
    { feature: 'Customizable profile', description: 'Custom theme on your profile', value: featureValues.customProfile },
  ];
  const checkboxRefs = Array.from({ length: featureData.length }, () => React.createRef());

  // STEP 4 CODE

  const selectedValues = selectedFeatures.map(item => item.value) || [];

  let valuesTotal = selectedPlanValue;

  selectedValues.forEach(value => {
    valuesTotal += value;
  });
  console.log('valuesTotal', valuesTotal);

  //Code to make the first letter of the selectedPlan to Capital
  let selectedPlanName = selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1);

  return (
    <>
      <Head>
        <title>Multistep Form</title>
      </Head>

      {/* BODY DIV */}
      <div className="bg-[#eef5ff] h-screen flex justify-center items-center font-[Ubuntu]">
        {/* CONTAINER */}
        <div className="  shadow-2xl rounded-xl bg-white p-5">
          {/* INNER CONTAINER */}
          <div className="grid grid-cols-10">
            {/* ##### SIDEBAR ##### */}
            <div className="col-span-3 rounded-lg p-8 bg-[url('../../public/assets/images/bg-sidebar-desktop.svg')] bg-cover bg-no-repeat">
              <div className="flex items-center mt-0 mb-7">
                <div
                  className={`font-semibold text-[15px] leading-[0]  px-3 py-4 rounded-full mr-4 border-[1px] border-[#bee1fd] text-[#bee1fd] ${step == STEP_1 ? "bg-[#bee1fd] text-black" : ""
                    }`}
                >
                  1
                </div>
                <div className="leading-[1.4] block">
                  <div className="text-[#bee1fd] text-[12px] opacity-70">
                    STEP 1
                  </div>
                  <div className="text-white text-[15px] font-medium tracking-[1px]">
                    YOUR INFO
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-0 mb-7">
                <div
                  className={`font-semibold text-[15px] leading-[0] border-[1px] border-[#bee1fd] text-[#bee1fd] px-3 py-4 rounded-full mr-4 ${step == STEP_2 ? "bg-[#bee1fd] text-[black]" : ""
                    }`}
                >
                  2
                </div>
                <div className="leading-[1.4] block">
                  <div className="text-[#bee1fd] text-[12px] opacity-70">
                    STEP 2
                  </div>
                  <div className="text-white text-[15px] font-medium tracking-[1px]">
                    SELECT PLAN
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-0 mb-7">
                <div
                  className={`font-semibold text-[15px] leading-[0] border-[1px] border-[#bee1fd] text-[#bee1fd] px-3 py-4 rounded-full mr-4 ${step == STEP_3 ? "bg-[#bee1fd] text-[black]" : ""
                    }`}
                >
                  3
                </div>
                <div className="leading-[1.4] block">
                  <div className="text-[#bee1fd] text-[12px] opacity-70">
                    STEP 3
                  </div>
                  <div className="text-white text-[15px] font-medium tracking-[1px]">
                    ADD-ONS
                  </div>
                </div>
              </div>

              <div className="flex items-center mt-0 mb-7">
                <div
                  className={`font-semibold text-[15px] leading-[0] border-[1px] border-[#bee1fd] text-[#bee1fd] px-3 py-4 rounded-full mr-4 ${step == STEP_4 ? "bg-[#bee1fd] text-[black]" : ""
                    }`}
                >
                  4
                </div>
                <div className="leading-[1.4] block">
                  <div className="text-[#bee1fd] text-[12px] opacity-70">
                    STEP 4
                  </div>
                  <div className="text-white text-[15px] font-medium tracking-[1px]">
                    SUMMARY
                  </div>
                </div>
              </div>
            </div>

            {/* ##### FORM #####  */}
            <div className="col-span-7 py-8 px-16">
              <section
                className={`step1 w-[411px] h-[429px]  ${step == STEP_1 ? "" : "hidden"
                  }`}
              >
                <h1 className="text-3xl font-bold text-[#02295a] mb-2">
                  Personal info
                </h1>
                <p className="text-[#9699ab] text-[15px]">
                  Please provide your name, email address and phone number.
                </p>

                <div className="mt-5">
                  {/* NAME INPUT */}
                  <div className="mb-3">

                    <div className="flex flex-row justify-between items-center">
                      <label
                        htmlFor="name"
                        className="text-[15px] text-[#02295a]"
                      >Name
                      </label>
                      {formik.touched.name && formik.errors.name && <p className="text-[#ed3548] text-[13px]">{formik.errors.name}</p>}
                    </div>

                    <input
                      className="p-3 py-[10px] w-full rounded-md border-[1px] mt-1"
                      id="name"
                      placeholder="e.g. Stephen King"
                      type="text"
                      name="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                    />
                  </div>

                  {/* EMAIL INPUT */}
                  <div className="mb-3">

                    <div className="flex flex-row justify-between items-center">
                      <label
                        htmlFor="email"
                        className="text-[15px] text-[#02295a]"
                      >
                        Email Address
                      </label>
                      {formik.touched.email && formik.errors.email && <p className="text-[#ed3548] text-[13px]">{formik.errors.email}</p>}
                    </div>


                    <input
                      className="p-3 py-[10px]  w-full rounded-md border-[1px] mt-1"
                      id="email"
                      placeholder="e.g. stephenking@lorem.com"
                      type="text"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                  </div>

                  {/* PHONE NUMBER INPUT */}
                  <div className="mb-3">
                    <div className="flex flex-row justify-between items-center">
                      <label
                        htmlFor="phoneNumber"
                        className="text-[15px] text-[#02295a]"
                      >
                        Phone Number
                      </label>
                      {formik.touched.phoneNumber && formik.errors.phoneNumber && <p className="text-[#ed3548] text-[13px]">{formik.errors.phoneNumber}</p>}
                    </div>

                    <input
                      className="p-3 py-[10px] w-full rounded-md border-[1px] mt-1"
                      id="phoneNumber"
                      placeholder="e.g. +1 234 567 890"
                      type="text"
                      name="phoneNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phoneNumber}
                    />
                  </div>

                  <div className="flex justify-end mt-[5rem]">
                    <button
                      onClick={formik.handleSubmit}
                      className="p-3 px-6 rounded-lg text-white text-[15px] bg-[#02295a] hover:bg-[#174a8b]"
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              </section>

              {/* ##### STEP 2 ##### */}
              <section
                className={`step2 w-[411px] h-[429px] ${step == STEP_2 ? "" : "hidden"
                  }`}
              >

                <h2 className="text-3xl font-bold text-[#02295a] mb-2">
                  Select your plan
                </h2>
                <p className="text-[15px] text-[#9699ab]">
                  You have the option of monthly or yearly billing
                </p>

                <div className="flex flex-row mt-10">
                  <div
                    className={`plan-box flex flex-col px-4 py-5 mr-3 rounded-xl hover:border-2 hover:border-[#473dff] cursor-pointer ${selectedPlan === 'arcade' ? 'bg-[#f0f6ff] border-2 border-[#473dff]' : 'border-2 border-[#d6d9e6]  '
                      }`}
                    onClick={() => handlePlanSelection('arcade', plans.arcade)}
                  >
                    <Image
                      src="assets/images/icon-arcade.svg"
                      width={40}
                      height={40}
                      alt="Picture of the author"
                      className="mr-8"
                    />
                    <h3 className="text-[#02295a] font-semibold mt-5">
                      Arcade
                    </h3>
                    <p className="mt-1 text-[#9699ab]">{CURRENCY + plans.arcade}/{duration}</p>
                    <div className={`text-[13px] transition-opacity font-medium text-[#02295a] ${isToggled ? 'opacity-100' : 'opacity-0'}`}>
                      2 months free
                    </div>
                  </div>

                  <div
                    className={`plan-box flex flex-col px-4 py-5 mr-3 rounded-xl hover:border-2 hover:border-[#473dff] cursor-pointer ${selectedPlan === 'advanced' ? 'bg-[#f0f6ff] border-2 border-[#473dff]' : 'border-2 border-[#d6d9e6]  '
                      }`}
                    onClick={() => handlePlanSelection('advanced', plans.advanced)}
                  >
                    <Image
                      src="assets/images/icon-advanced.svg"
                      width={40}
                      height={40}
                      alt="Picture of the author"
                      className="mr-8"
                    />
                    <h3 className="text-[#02295a] font-semibold mt-5">
                      Advanced
                    </h3>
                    <p className="mt-1 text-[#9699ab]">{CURRENCY + plans.advanced}/{duration}</p>
                    <div className={`text-[13px] transition-opacity font-medium text-[#02295a] ${isToggled ? 'opacity-100' : 'opacity-0'}`}>
                      2 months free
                    </div>
                  </div>

                  <div
                    className={`plan-box flex flex-col px-4 py-5 mr-3 rounded-xl hover:border-2 hover:border-[#473dff] cursor-pointer ${selectedPlan === 'pro' ? 'bg-[#f0f6ff] border-2 border-[#473dff]' : 'border-2 border-[#d6d9e6]'
                      }`}
                    onClick={() => handlePlanSelection('pro', plans.pro)}
                  >
                    <Image
                      src="assets/images/icon-pro.svg"
                      width={40}
                      height={40}
                      alt="Picture of the author"
                      className="mr-8"
                    />
                    <h3 className="text-[#02295a] font-semibold mt-5">Pro</h3>
                    <p className="mt-1 text-[#9699ab]">{CURRENCY + plans.pro}/{duration}</p>
                    <div className={`text-[13px] transition-opacity font-medium text-[#02295a] ${isToggled ? 'opacity-100' : 'opacity-0'}`}>
                      2 months free
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center p-3 rounded-lg bg-[#f0f6ff]">
                  <div className="flex items-center">
                    <div className="text-[14px] text-[#9699ab] font-semibold">
                      Monthly
                    </div>

                    <div className="relative inline-block mx-4">
                      <label className="switch">
                        <input type="checkbox" checked={isToggled} onChange={handleCheckboxChange} />
                        <span className="slider round"></span>
                      </label>
                    </div>

                    <div className="text-[14px] text-[#9699ab] font-semibold">
                      Yearly
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-[3.25rem]">
                  <button
                    onClick={() => setStep(STEP_1)}
                    className="p-3 px-6 text-[#9699ab] hover:text-[#174a8b] hover:font-medium text-[15px]"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => setStep(STEP_3)}
                    className="p-3 px-6 rounded-lg text-white text-[15px] bg-[#02295a] hover:bg-[#174a8b]"
                  >
                    Next Step
                  </button>
                </div>
              </section>

              {/* STEP 3 */}
              <section
                className={`step3 w-[411px] h-[429px] ${step == STEP_3 ? "" : "hidden"
                  }`}
              >
                <h1 className="text-3xl font-bold text-[#02295a] mb-2">
                  Pick add-ons
                </h1>
                <p className="text-[#9699ab] text-[15px]">
                  Add-ons help enhance your gaming experience.
                </p>

                <div className="mt-6">
                  {/* ##### CHECKBOX CONTAINER #####*/}
                  {/* Checkbox  */}
                  {featureData.map((feature, index) => {
                    const isSelectedFeature = selectedFeatures.some((selected) => selected.feature === feature.feature);

                    return (
                      <div
                        key={index}
                        className={`check-box mx-auto py-4 px-7 rounded-lg  cursor-pointer hover:border-2 hover:border-[#473dff] focus:bg-[#f0f6ff] mb-4  ${isSelectedFeature ? 'bg-[#f0f6ff] border-2 border-[#473dff] ' : 'border-2 border-[#d6d9e6]'}`}
                        onClick={() => handleFeatureSelection(feature)}
                      >
                        <div className="flex justify-between items-center pb-2">
                          <div className="flex items-center">

                            <input
                              ref={checkboxRefs[index]}
                              type="checkbox"
                              className="inline w-4 h-4 mr-4 cursor-pointer"
                              checked={isSelectedFeature}
                              onChange={() => handleFeatureSelection(feature)}
                            />
                            <div className="flex flex-col">
                              <p className="text-[16px] font-[500] text-[#02295a]">
                                {feature.feature}
                              </p>
                              <p className="text-[14px] text-[#9699ab]">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                          <p className="text-[14px] text-[#473dff]">{`+${CURRENCY}${feature.value}/${duration}`}</p>
                        </div>
                      </div>

                    )
                  })}

                  {/* <div className="check-box mx-auto py-4 px-7 bg-white rounded-lg border-2 border-[#d6d9e6] cursor-pointer hover:border-2 hover:border-[#473dff] focus:bg-[#f0f6ff] mb-4">
                      <div className="flex justify-between items-center pb-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="inline w-4 h-4 mr-4 cursor-pointer"
                          />
                          <div className="flex flex-col">
                            <p className="text-[15px] font-semibold text-[#02295a]">
                              Online Service
                            </p>
                            <p className="text-[14px] text-[#9699ab]">
                              Access to multiplayer games
                            </p>
                          </div>
                        </div>
                        <p className="text-[14px] text-[#473dff]">+$10/yr</p>
                      </div>
                    </div> */}
                  {/* Checkbox  */}
                  {/* <div className="check-box mx-auto py-4 px-7 bg-white rounded-lg border-2 border-[#d6d9e6] cursor-pointer hover:border-2 hover:border-[#473dff] focus:bg-[#f0f6ff] mb-4">
                      <div className="flex justify-between items-center pb-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="inline w-4 h-4 mr-4 cursor-pointer"
                          />
                          <div className="flex flex-col">
                            <p className="text-[15px] font-semibold text-[#02295a]">
                              Larger storage
                            </p>
                            <p className="text-[14px] text-[#9699ab]">
                              Extra 1TB of cloud save
                            </p>
                          </div>
                        </div>
                        <p className="text-[14px] text-[#473dff]">+$20/yr</p>
                      </div>
                    </div> */}
                  {/* Checkbox  */}
                  {/* <div className="check-box mx-auto py-4 px-7 bg-white rounded-lg border-2 border-[#d6d9e6] cursor-pointer hover:border-2 hover:border-[#473dff] focus:bg-[#f0f6ff] mb-4">
                      <div className="flex justify-between items-center pb-2">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="inline w-4 h-4 mr-4 cursor-pointer"
                          />
                          <div className="flex flex-col">
                            <p className="text-[15px] font-semibold text-[#02295a]">
                              Customizable profile
                            </p>
                            <p className="text-[14px] text-[#9699ab]">
                              Custom theme on your profile
                            </p>
                          </div>
                        </div>
                        <p className="text-[14px] text-[#473dff]">+$20/yr</p>
                      </div>
                    </div> */}
                </div>

                <div className="flex justify-between mt-[1.5rem]">
                  <button
                    onClick={() => setStep(STEP_2)}
                    className="p-3 px-6 text-[#9699ab] hover:text-[#174a8b] hover:font-medium text-[15px]"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => setStep(STEP_4)}
                    className="p-3 px-6 rounded-lg text-white text-[15px] bg-[#02295a] hover:bg-[#174a8b]"
                  >
                    Next Step
                  </button>
                </div>
              </section>

              {/* STEP 4 */}

              {/* {console.log("STEP 4", selectedPlanValue)} */}

              <section
                className={`step4 w-[411px] h-[429px] ${step == STEP_4 ? "" : "hidden"
                  }`}
              >
                <h1 className="text-3xl font-bold text-[#02295a] mb-2">
                  Finishing up
                </h1>
                <p className="text-[#9699ab] text-[15px]">
                  Double-check everything looks OK before confirming.
                </p>

                <div className="mt-6">
                  <div className="p-6 rounded-xl bg-[#f0f6ff]">
                    <div className="flex justify-between items-center pb-8 border-b-[1px] border-[#9699ab]">
                      <div className="leading-[1.2]">
                        <div className="text-[16px] text-[#02295a] font-medium">
                          {selectedPlanName} ({montlyOrYearly})
                        </div>
                        <div>
                          <div className="inline-block text-[14px] border-b-[2px] hover:text-[#473dff] border-[#d6d9e6] text-[#9699ab] cursor-pointer"
                            onClick={() => setStep(STEP_2)}
                          >
                            Change
                          </div>
                        </div>
                      </div>
                      <div className="text-[16px] text-[#02295a] font-semibold">
                        ${selectedPlanValue}/{duration}
                      </div>
                    </div>

                    {selectedFeatures.map((item, index) => (<>

                      <div key={index} className="flex justify-between mt-3">
                        <div className="text-[14px] text-[#9699ab]">
                          {item.feature}
                        </div>
                        <div className="text-[14px] text-[#02295a]">+${item.value}/{duration}</div>
                      </div>
                    </>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 px-6">
                  <div className="text-[14px] text-[#9699ab]">
                    Total (per {montlyOrYearly})
                  </div>
                  <div className="text-[20px] text-[#473dff] font-semibold">
                    +${valuesTotal}/{duration}
                  </div>
                </div>

                <div className="flex justify-between mt-[3.6rem]">
                  <button
                    onClick={() => setStep(STEP_3)}
                    className="p-3 px-6 text-[#9699ab] hover:text-[#174a8b] hover:font-medium text-[15px]"
                  >
                    Go Back
                  </button>
                  <button
                    onClick={() => setStep(STEP_5)}
                    className="p-3 px-6 rounded-lg text-white text-[15px] bg-[#02295a] hover:bg-[#174a8b]"
                  >
                    Next Step
                  </button>
                </div>
              </section>

              {/* STEP 5 */}
              <section
                className={`step5 w-[411px] h-[429px] ${step == STEP_5 ? "" : "hidden"
                  }`}
              >
                <div className="flex flex-col items-center py-28 gap-2">
                  <Image
                    src="assets/images/icon-thank-you.svg"
                    width={60}
                    height={60}
                    alt="Picture of the author"
                    className="mb-3"
                  />

                  <h3 className="text-3xl font-bold text-[#02295a] mb-2">
                    Thank You!
                  </h3>
                  <p className="text-[#9699ab] text-[14px] px-4 text-center">
                    Thanks for confirming your subscription! We hope you have
                    fun using our platform. If you ever need support, plase feel
                    free to email us at support@loremgaming.com.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
