const PostAddress = ({ address }) => {
  let addressArray = [];
  if (address?.formatted_address) {
    addressArray = address.formatted_address.split("،");
  }

  return (
    <>
      <div className="text-gray-500 font-bold text-xl">آدرس</div>
      <div className="pr-2 pb-20" style={{ wordSpacing: "0.2rem" }}>
        {address?.province ? address?.province : ""} شهر{" "}
        {addressArray[0] ? addressArray[0] : ""} خیابان{" "}
        {addressArray[1] ? addressArray[1] : ""} خیابان
        {addressArray[2] ? addressArray[2] : ""} کوچه
        {addressArray[3] ? addressArray[3] : ""}
      </div>
    </>
  );
};

export default PostAddress;
