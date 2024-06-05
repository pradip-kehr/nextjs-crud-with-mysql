import { Html, Head, Body } from '@react-email/components';
import React from 'react'

type Props = {
    errorRecords: number;
    newCreatedRecords: number;
    processedRecords: number;
    totalRecords: number;
    fileName: string
}

const ImportComplete = ({ totalRecords, errorRecords, newCreatedRecords, processedRecords, fileName }: Props) => {
    return (
        <>
            <Html lang="en" dir="ltr">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Import Process completed</title>
                </Head>
                <Body>
                    <div>
                        <div className="aHl" />
                        <div id=":iu" tabIndex={-1} />
                        <div id=":jx" className="ii gt">
                            <div id=":jw" className="a3s aiL msg-5142624744483665849"><u />
                                <div style={{ "margin": "0", backgroundColor: "#f5f8fa", "padding": "0", fontFamily: "Helvetica,Arial,sans-serif", fontSize: "16px", "height": "100%", "width": "100%", minWidth: "100%" }}>
                                    <table id="m_-5142624744483665849outerWrapper" border={0} cellSpacing={0} width="100%" bgcolor="#f5f8fa" style={{ fontFamily: "Helvetica,Arial,sans-serif", fontSize: "16px", "color": "#425b76", lineHeight: "1.5", "width": "100%", minWidth: "100%", backgroundColor: "#f5f8fa" }}>
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="top">
                                                    <table border={0} cellSpacing={0} width={700} bgcolor="#ffffff" style={{ "width": "700px", backgroundColor: "#ffffff" }}>
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" valign="top" width="100%" style={{ "width": "100%", minWidth: "100%", backgroundColor: "#ffffff" }}>
                                                                    <table border={0} cellSpacing={0} width="100%" style={{ "width": "100%", minWidth: "100%" }}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" valign="middle" width="100%" style={{ "height": "4px", backgroundColor: "#ff7a59", "width": "100%", minWidth: "100%", fontSize: "4px", lineHeight: "4px" }}>
                                                                                    <span style={{ "color": "transparent", "background": "none", textOverflow: "ellipsis", "opacity": "0", "width": "100%", minWidth: "100%", "height": "1", "padding": "0", fontSize: "0" }}>
                                                                                        &nbsp;</span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td align="center" valign="middle" width="100%" style={{ "width": "100%", minWidth: "100%", "display": "none" }}>
                                                                                    LOGO
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table border={0} cellSpacing={0} width={500} bgcolor="#ffffff" style={{ "width": "500px", backgroundColor: "#ffffff" }}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="left" valign="top" width="100%" style={{ "width": "100%", minWidth: "100%" }}>
                                                                                    <hr style={{ "height": "1px", "color": "#eaf0f6", backgroundColor: "#eaf0f6", "border": "none", "margin": "0px", "padding": "0px" }} />
                                                                                    <table border={0} cellSpacing={0} width="100%" style={{ fontSize: "0", "height": "15px", "width": "100%", minWidth: "100%", lineHeight: "0" }}>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td height={15}><span style={{ "color": "transparent", "background": "none", textOverflow: "ellipsis", "opacity": "0", "width": "100%", minWidth: "100%", "height": "1", "padding": "0", fontSize: "0" }}>
                                                                                                    &nbsp;</span></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                    <table border={0} cellSpacing={0} width="100%">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" valign="middle" style={{ "padding": "0" }}>
                                                                                                    <table border={0} cellSpacing={0} width="100%" style={{ fontSize: "0", "height": "10px", "width": "100%", minWidth: "100%", lineHeight: "0" }}>
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td height={10}><span style={{ "color": "transparent", "background": "none", textOverflow: "ellipsis", "opacity": "0", "width": "100%", minWidth: "100%", "height": "1", "padding": "0", fontSize: "0" }}>
                                                                                                                    &nbsp;</span>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                    <h1 style={{ fontSize: "24px", fontWeight: "600", "margin": "0", textAlign: "center" }}>
                                                                                                        Your
                                                                                                        import &quot;{fileName}&quot; is ready
                                                                                                    </h1>
                                                                                                    <table border={0} cellSpacing={0} width="100%" style={{ fontSize: "0", "height": "30px", "width": "100%", minWidth: "100%", lineHeight: "0" }}>
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td height={30}><span style={{ "color": "transparent", "background": "none", textOverflow: "ellipsis", "opacity": "0", "width": "100%", minWidth: "100%", "height": "1", "padding": "0", fontSize: "0" }}>
                                                                                                                    &nbsp;</span>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                    <hr style={{ "height": "1px", "color": "#eaf0f6", backgroundColor: "#eaf0f6", "border": "none", "margin": "0px", "padding": "0px" }} />
                                                                                                    <table border={0} cellSpacing={0} width="100%" style={{ fontSize: "0", "height": "30px", "width": "100%", minWidth: "100%", lineHeight: "0" }}>
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td height={30}><span style={{ "color": "transparent", "background": "none", textOverflow: "ellipsis", "opacity": "0", "width": "100%", minWidth: "100%", "height": "1", "padding": "0", fontSize: "0" }}>
                                                                                                                    &nbsp;</span>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                    <h3 style={{ fontSize: "16px", fontWeight: "600", "margin": "0" }}>
                                                                                        <u />Your data summary<u />
                                                                                    </h3>
                                                                                    <table border={0} cellSpacing={0} width="100%" style={{ fontSize: "0", "height": "20px", "width": "100%", minWidth: "100%", lineHeight: "0" }}>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td height={20}><span style={{ "color": "transparent", "background": "none", textOverflow: "ellipsis", "opacity": "0", "width": "100%", minWidth: "100%", "height": "1", "padding": "0", fontSize: "0" }}>
                                                                                                    &nbsp;</span></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                    <p style={{ "margin": "0" }}> <u />Out of the
                                                                                        {totalRecords} rows provided in this import,
                                                                                        we processed {processedRecords}
                                                                                        records; {processedRecords} of the
                                                                                        {newCreatedRecords} records were newly
                                                                                        created. <u /> </p>
                                                                                    {errorRecords &&
                                                                                        <div style={{ "margin": "0" }}>and <span style={{ "color": "red" }}>{errorRecords}</span>
                                                                                            records had error<u /> </div>
                                                                                    }
                                                                                    <table border={0} cellSpacing={0} width="100%" style={{ fontSize: "0", "height": "50px", "width": "100%", minWidth: "100%", lineHeight: "0" }}>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td height={50}><span style={{ "color": "transparent", "background": "none", textOverflow: "ellipsis", "opacity": "0", "width": "100%", minWidth: "100%", "height": "1", "padding": "0", fontSize: "0" }}>
                                                                                                    &nbsp;</span></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                    <table width="100%" border={0} cellSpacing={0} style={{ "width": "100%", minWidth: "100%" }}>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center">
                                                                                                    <table border={0} cellSpacing={0}>
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center" style={{ borderRadius: "3px", backgroundColor: "#425b76" }} width="auto"><a href="http://localhost:3001/" style={{ "border": "1px solid #425b76", borderRadius: "3px", "color": "#ffffff", "display": "inline-block", fontSize: "14px", fontWeight: "400", lineHeight: "1", "padding": "12px 20px", textDecoration: "none", "width": "auto", minWidth: "170px", whiteSpace: "nowrap" }} target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://app-eu1.hubspot.com/api/notification-station/general/v1/notifications/cta/dea7397e-d93f-4030-8e38-378f8832887f?notificationPortalId%3D144780862%26deliveryMethod%3DEMAIL&source=gmail&ust=1717072800214000&usg=AOvVaw3BdjZuanyk1rOJ0dPZOwRR">View
                                                                                                                    Import</a></td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                    <div>
                                                                                        <div />
                                                                                    </div>
                                                                                    <div />
                                                                                    <table border={0} cellSpacing={0} width="100%" style={{ fontSize: "0", "height": "50px", "width": "100%", minWidth: "100%", lineHeight: "0" }}>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td height={50}><span style={{ "color": "transparent", "background": "none", textOverflow: "ellipsis", "opacity": "0", "width": "100%", minWidth: "100%", "height": "1", "padding": "0", fontSize: "0" }}>
                                                                                                    &nbsp;</span></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <table id="m_-5142624744483665849footer" border={0} cellSpacing={0} width="100%" bgcolor="#f5f8fa" style={{ "width": "100%", minWidth: "100%", height: "100%" }}>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center" valign="top">
                                                                                    <table border={0} cellSpacing={0} width={500} style={{ "width": "500px", height: "100%" }}>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td align="center" valign="top">
                                                                                                    <table border={0} cellSpacing={0} width="100%">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td align="center" valign="middle" style={{ "padding": "20px 0 65px" }}>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div className="yj6qo" />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </Body>
            </Html>
        </>
    )
}

export default ImportComplete