import React, { useState } from 'react';


export default function Form() {
    return (
        <section class="content" style={{ backgroundColor: "white" }}>
            <div class="body_scroll">
                <div class="block-header" >
                    <div class="row">
                        <div class="col-lg-7 col-md-6 col-sm-12">
                            <h2>Dashboard</h2>
                            {/* <ul class="breadcrumb">
                        <li class="breadcrumb-item"><a href="index.html"><i class="zmdi zmdi-home"></i> Aero</a></li>
                        <li class="breadcrumb-item"><a href="javascript:void(0);">Forms</a></li>
                        <li class="breadcrumb-item active">Form Wizard</li>
                    </ul> */}
                            <button class="btn btn-primary btn-icon mobile_menu" type="button"><i class="zmdi zmdi-sort-amount-desc"></i></button>
                        </div>
                        {/* <div class="col-lg-5 col-md-6 col-sm-12">
                            <button class="btn btn-primary btn-icon float-right right_icon_toggle_btn" type="button"><i class="zmdi zmdi-arrow-right"></i></button>
                        </div> */}
                    </div>
                </div>
                <div class="container-fluid" style={{ backgroundColor: "F3F6F9" }}>
                    <div class="row clearfix">
                        <div class="col-sm-12">
                            <div class="card p-4 mt-2">
                                <div className="body p-5">
                                    <div className="row clearfix">
                                        <div className="col-md-12">
                                            <h2 className="card-inside-title">
                                                {/* <strong>List of Believers Group </strong> */}
                                            </h2>
                                        </div>
                                    </div>
                                    {/* <h2>Example Tab</h2> */}
                                    {/* <ul class="header-dropdown">
                                <li class="dropdown"> <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <i class="zmdi zmdi-more"></i> </a>
                                    <ul class="dropdown-menu dropdown-menu-right">
                                        <li><a href="javascript:void(0);">Action</a></li>
                                        <li><a href="javascript:void(0);">Another action</a></li>
                                        <li><a href="javascript:void(0);">Something else</a></li>
                                    </ul>
                                </li>
                                <li class="remove">
                                    <a role="button" class="boxs-close"><i class="zmdi zmdi-close"></i></a>
                                </li>
                            </ul> */}
                                </div>                      </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}