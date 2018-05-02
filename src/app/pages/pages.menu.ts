export const EMPLOYEE_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'edit-profile',
        data: {
          menu: {
            title: 'Edit Profile',
            selected: false,
            expanded: false,
            order: 0,
            hidden: true
          }
        }
      },
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'send-email',
        data: {
          menu: {
            title: 'Send Email',
            icon: 'ion-email',
            selected: false,
            expanded: false,
            order: 100
          }
        }
      },
      {
        path: 'students',
        data: {
          menu: {
            title: 'Students',
            icon: 'ion-android-person',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'enquiry',
            data: {
              menu: {
                title: 'Enquiry Form',
              }
            }
          },
          {
            path: 'register',
            data: {
              menu: {
                title: 'Registration Form',
              }
            }
          },
          {
            path: 'search',
            data: {
              menu: {
                title: 'Search',
              }
            }
          },
          {
            path: 'student-list',
            data: {
              menu: {
                title: 'Student List',
                hidden: true
              }
            }
          }
        ]
      }
    ]
  }
];


export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'edit-profile',
        data: {
          menu: {
            title: 'Edit Profile',
            selected: false,
            expanded: false,
            order: 0,
            hidden: true
          }
        }
      },
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-grid',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'importdata',
        data: {
          menu: {
            title: 'Import Data',
            icon: 'ion-android-folder',
            selected: false,
            expanded: false,
            order: 100
          }
        }
      },
      {
        path: 'assigntask',
        data: {
          menu: {
            title: 'Assign Task',
            icon: 'ion-android-create',
            selected: false,
            expanded: false,
            order: 100
          }
        }
      },
      {
        path: 'send-email',
        data: {
          menu: {
            title: 'Send Email',
            icon: 'ion-email',
            selected: false,
            expanded: false,
            order: 300
          }
        }
      },
      /*
      {
        path: 'editors',
        data: {
          menu: {
            title: 'Mails',
            icon: 'ion-email-unread',
            selected: false,
            expanded: false,
            order: 100,
          }
        },
        children: [
          {
            path: 'ckeditor',
            data: {
              menu: {
                title: 'Compose Mail',
              }
            }
          }
        ]
      },
      */
      /*
      {
        path: 'charts',
        data: {
          menu: {
            title: 'general.menu.charts',
            icon: 'ion-stats-bars',
            selected: false,
            expanded: false,
            order: 200,
          }
        },
        children: [
          {
            path: 'chartist-js',
            data: {
              menu: {
                title: 'general.menu.chartist_js',
              }
            }
          }
        ]
      },
      */

      /*
     {
       path: 'ui',
       data: {
         menu: {
           title: 'general.menu.ui_features',
           icon: 'ion-android-laptop',
           selected: false,
           expanded: false,
           order: 300,
         }
       },
       children: [
         {
           path: 'typography',
           data: {
             menu: {
               title: 'general.menu.typography',
             }
           }
         },
         {
           path: 'buttons',
           data: {
             menu: {
               title: 'general.menu.buttons',
             }
           }
         },
         {
           path: 'icons',
           data: {
             menu: {
               title: 'general.menu.icons',
             }
           }
         },
         {
           path: 'modals',
           data: {
             menu: {
               title: 'general.menu.modals',
             }
           }
         },
         {
           path: 'slim',
           data: {
             menu: {
               title: 'Slim loading bar',
             }
           }
         },
         {
           path: 'grid',
           data: {
             menu: {
               title: 'general.menu.grid',
             }
           }
         },
       ]
     },
     {
       path: 'forms',
       data: {
         menu: {
           title: 'general.menu.form_elements',
           icon: 'ion-compose',
           selected: false,
           expanded: false,
           order: 400,
         }
       },
       children: [
         {
           path: 'inputs',
           data: {
             menu: {
               title: 'general.menu.form_inputs',
             }
           }
         },
         {
           path: 'layouts',
           data: {
             menu: {
               title: 'general.menu.form_layouts',
             }
           }
         }
       ]
     },
     */
      {
        path: 'availables',
        data: {
          menu: {
            title: 'Employee Manager',
            icon: 'ion-android-contacts',
            selected: false,
            expanded: false,
            order: 500,
          }
        },
        children: [

          /*
          {
            path: 'basictables',
            data: {
              menu: {
                title: 'general.menu.basic_tables',
              }
            }
          },
          {
            path: 'smarttables',
            data: {
              menu: {
                title: 'general.menu.smart_tables',
              }
            }
          },
          */

          {
            path: 'employees',
            data: {
              menu: {
                title: 'Available',
              }
            }
          }

          /*
          {
            path: 'hottables',
            data: {
              menu: {
                title: 'Hot Tables',
              }
            }
          }
          */
        ]
      },
      {
        path: 'students',
        data: {
          menu: {
            title: 'Student Manager',
            icon: 'ion-android-person',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'enquiry',
            data: {
              menu: {
                title: 'Enquiry Form',
              }
            }
          },
          {
            path: 'register',
            data: {
              menu: {
                title: 'Registration Form',
              }
            }
          },
         
          {
            path: 'student-list',
            data: {
              menu: {
                title: 'Student List',
                hidden: true
              }
            }
          }
        ]
      },
      {
         path: 'followup',
        data: {
          menu: {
            title: 'Follow Up',
            icon: 'ion-android-call',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'search',
            data: {
              menu: {
                title: 'Calling',
              }
            }
          },
          {
            path: 'sms',
            data: {
              menu: {
                title: 'SMS',
              }
            }
          }
        ]
      },

      /*
      ,
      {
        path: 'maps',
        data: {
          menu: {
            title: 'general.menu.maps',
            icon: 'ion-ios-location-outline',
            selected: false,
            expanded: false,
            order: 600,
          }
        },
        children: [
          {
            path: 'googlemaps',
            data: {
              menu: {
                title: 'general.menu.google_maps',
              }
            }
          },
          {
            path: 'leafletmaps',
            data: {
              menu: {
                title: 'general.menu.leaflet_maps',
              }
            }
          },
          {
            path: 'bubblemaps',
            data: {
              menu: {
                title: 'general.menu.bubble_maps',
              }
            }
          },
          {
            path: 'linemaps',
            data: {
              menu: {
                title: 'general.menu.line_maps',
              }
            }
          }
        ]
      }
      
      ,
      {
        path: '',
        data: {
          menu: {
            title: 'general.menu.pages',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['/login'],
            data: {
              menu: {
                title: 'general.menu.login'
              }
            }
          },
          {
            path: ['/register'],
            data: {
              menu: {
                title: 'general.menu.register'
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'general.menu.menu_level_1',
            icon: 'ion-ios-more',
            selected: false,
            expanded: false,
            order: 700,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.menu_level_1_1',
                url: '#'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'general.menu.menu_level_1_2',
                url: '#'
              }
            },
            children: [
              {
                path: '',
                data: {
                  menu: {
                    title: 'general.menu.menu_level_1_2_1',
                    url: '#'
                  }
                }
              }
            ]
          }
        ]
      }
      
      ,
      {
        path: '',
        data: {
          menu: {
            title: 'general.menu.external_link',
            url: 'http://akveo.com',
            icon: 'ion-android-exit',
            order: 800,
            target: '_blank'
          }
        }
      }
      */

    ]
  }
];

