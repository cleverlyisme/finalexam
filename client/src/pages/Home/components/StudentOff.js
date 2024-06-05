import React, { useEffect } from "react"

import Tooltip from "../../../components/common/Tooltip"
import AdminCard from "../../../components/Admin/AdminCard"

const StudentOff = (props) => {
    useEffect(() => {
        // props.teacherGetStudentOff()
    }, [])

    const permission = props?.studentOff?.filter((item) => item.permission) || []
    const noPermission = props?.studentOff?.filter((item) => !item.permission) || []

    const renderTooltipPermission = () => {
        if (permission && permission.length > 0) {
            return (
                <Tooltip key="permission" id="permission">
                    {permission.map((item, index) => (
                        <p key={index} className="mb-2">
                            {item.studentName}
                        </p>
                    ))}
                </Tooltip>
            )
        }
    }

    const renderTooltipNoPermission = () => {
        if (noPermission && noPermission.length > 0) {
            return (
                <Tooltip key="noPermission" id="noPermission">
                    {noPermission.map((item, index) => (
                        <p key={index} className="mb-2">
                            {item.studentName}
                        </p>
                    ))}
                </Tooltip>
            )
        }
    }

    return (
        <div className="mb-4">
            {renderTooltipPermission()}
            {renderTooltipNoPermission()}
            <AdminCard color="danger" viewOnly>
                <div className="d-flex justify-content-between">
                    <span>Học sinh nghỉ hôm nay</span>
                    <span data-tip="permission" data-for="permission">
                        {permission.length} <i className="fas fa-user-plus" />
                    </span>
                    <span data-tip="noPermission" data-for="noPermission">
                        {noPermission.length}{" "}
                        <i className="fas fa-user-minus" />
                    </span>
                </div>
            </AdminCard>
        </div>
    )
}

export default StudentOff
