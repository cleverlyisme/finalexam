import AdminBlock from "../../../../components/Admin/AdminBlock";

const PaidFees = () => {
  return (
    <AdminBlock
      title="Các khoản đã đóng (0)"
      icon="fas fa-list-check"
      className="mb-4"
      height={310}
    >
      {/* <Transcript studentId={user._id} isComponent /> */}
    </AdminBlock>
  );
};

export default PaidFees;
