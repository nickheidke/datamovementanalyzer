﻿using dvvModels;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DataMovementAnalyzer
{
    public partial class Preferencescs : Form
    {
        DataVelocityVisualizer objDataAnalyzer;
        dvvPrefsModel objModel;
        public Preferencescs(DataVelocityVisualizer sender, dvvPrefsModel objPrefsModel)
        {
            InitializeComponent();

            objDataAnalyzer = sender;

            objModel = objPrefsModel;

            setupBindings();

        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void frmPreferencescs_Load(object sender, EventArgs e)
        {
            //txtNumberOfPoints.Text = objModel.NumberOfPoints.ToString();
            //txtPollingFrequency.Text = objModel.PollingFrequency.ToString() ;
            //chkRunCustomQuery.Checked = objModel.RunCustomQuery;
        }

        private void btnOK_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Saving preferences will remove previous data points", "Warning: Data Reset", MessageBoxButtons.OKCancel, MessageBoxIcon.Warning) == DialogResult.OK)
            {
                objDataAnalyzer.Prefs = objModel;
                objDataAnalyzer.saveConfig();
                this.Close();
            }
        }

        private void setupBindings()
        {
            txtNumberOfPoints.DataBindings.Add("Text",
                                objModel,
                                "NumberOfPoints",
                                false,
                                DataSourceUpdateMode.OnPropertyChanged);

            txtPollingFrequency.DataBindings.Add("Text",
                                objModel,
                                "PollingFrequency",
                                false,
                                DataSourceUpdateMode.OnPropertyChanged);

            chkRunCustomQuery.DataBindings.Add("Checked",
                                objModel,
                                "RunCustomQuery",
                                false,
                                DataSourceUpdateMode.OnPropertyChanged);

            chkTop5.DataBindings.Add("Checked",
                                objModel,
                                "IncludeTop5Graph",
                                false,
                                DataSourceUpdateMode.OnPropertyChanged);

            rdbTotalRowsLinear.DataBindings.Add("Checked",
                                objModel,
                                "bTotalRowsLinear",
                                false,
                                DataSourceUpdateMode.OnPropertyChanged);

            rdbTotalRowsLog.DataBindings.Add("Checked",
                                objModel,
                                "bTotalRowsLog",
                                false,
                                DataSourceUpdateMode.OnPropertyChanged);

            rdbRPSLinear.DataBindings.Add("Checked",
                                objModel,
                                "bRPSScaleLinear",
                                false,
                                DataSourceUpdateMode.OnPropertyChanged);

            rdbRPSLog.DataBindings.Add("Checked",
                                objModel,
                                "bRPSScaleLog",
                                false,
                                DataSourceUpdateMode.OnPropertyChanged);

            rdbTopColumnsLinear.DataBindings.Add("Checked",
                                objModel,
                                "bTopColumnsScaleLinear",
                                false,
                                DataSourceUpdateMode.OnPropertyChanged);

            rdbTopColumnsLog.DataBindings.Add("Checked",
                                objModel,
                                "bTopColumnsScaleLog",
                                false,
                                DataSourceUpdateMode.OnPropertyChanged);

        }

        private void rdbTotalRowsLinear_CheckedChanged(object sender, EventArgs e)
        {
            /*
            if (!((RadioButton)sender).Checked)
            {
                rdbTotalRowsLog.Checked = true;
            }
             */
        }

    }
}
