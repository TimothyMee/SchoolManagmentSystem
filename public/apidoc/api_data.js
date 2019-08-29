define({ "api": [
  {
    "type": "post",
    "url": "/api/v1.0/auth/login",
    "title": "Logs in a User (Staff, Student)",
    "version": "1.0.0",
    "name": "Log_User_in",
    "group": "Auth",
    "permission": [
      {
        "name": "no authentication"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": "<p>The Student's email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>The Student's role</p>"
          },
          {
            "group": "Request body",
            "type": "Password",
            "optional": false,
            "field": "password",
            "description": "<p>The Student's password</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n  \"email\": \"Timothy@gmail.com\"\n   \"role\": \"Teacher\"\n  \"password\": \"password\"\n}\n\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());\n\n\nNOTE:Use email = timothy33.tf@gmail.com, password = timothy and role = PRINCIPAL to login.\nThis account can be used to create any other staff and give permissions",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>User token!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n \"token\": \"57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a57e903941ca43a5f0805ba5a\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 Invalid Email / Password",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Auth"
  },
  {
    "type": "put",
    "url": "/api/v1.0/class/:class_id/add",
    "title": "Add Student to Class",
    "version": "1.0.0",
    "name": "Add_Student_to_class",
    "group": "Class",
    "permission": [
      {
        "name": "authenticated staff with ADD_STUDENT_TO_CLASS permission"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "student",
            "description": "<p>The student id</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "class_id",
            "optional": false,
            "field": "class",
            "description": "<p>The class id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n\n$http.put(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Class",
            "description": "<p>class with newly added student!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n  {\n     \"title\": \"English\",\n     \"course_code\": \"ENG101\"\n     \"students\": \"[{\n         \"student\" : \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     }]\",\n     \"semester\": \"First\",\n     \"year\" : \"2018\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   },",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 You don't have the permission to add student\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 400 student is already registered\nHTTP/1.1 400 no student found\nHTTP/1.1 400 Student can't enroll in more than 6 courses",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Class"
  },
  {
    "type": "post",
    "url": "/api/v1.0/class/:class_id/add",
    "title": "Add Student to Class",
    "version": "1.0.0",
    "name": "Add_Student_to_class",
    "group": "Class",
    "permission": [
      {
        "name": "authenticated staff with ADD_STUDENT_TO_CLASS permission"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "student",
            "description": "<p>The student id</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "class_id",
            "optional": false,
            "field": "class",
            "description": "<p>The class id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\nconst data = {\n  \"student\": \"5d65f85b1c9d44005d65f85b1c9d4400\",\n}\n\n$http.post(url, config, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Class",
            "description": "<p>class with newly added student!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n  {\n     \"title\": \"English\",\n     \"course_code\": \"ENG101\"\n     \"students\": \"[{\n         \"student\" : \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     }]\",\n     \"semester\": \"First\",\n     \"year\" : \"2018\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   },",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 You don't have the permission to add student\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 400 student is already registered\nHTTP/1.1 400 no student found\nHTTP/1.1 400 Student can't enroll in more than 6 courses",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Class"
  },
  {
    "type": "post",
    "url": "/api/v1.0/class",
    "title": "Create Class",
    "version": "1.0.0",
    "name": "Create_Class",
    "group": "Class",
    "permission": [
      {
        "name": "authenticated staff with CREATE_CLASS permission"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>The Class's title</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "course_code",
            "description": "<p>The Class's course_code.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "semester",
            "description": "<p>The Class's  semeter.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "year",
            "description": "<p>The Class's  year.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\nconst data = {\n  \"title\": \"English\",\n  \"course_code\": \"ENG101\",\n  \"semester\": \"First\",\n  \"year\": \"2018\",\n}\n\n$http.post(url, config, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Class",
            "description": "<p>newly created class!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n     \"title\": \"English\",\n     \"course_code\": \"ENG101\"\n     \"students\": \"[]\",\n     \"semester\": \"First\",\n     \"year\" : \"2018\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   },",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 staff not found\nHTTP/1.1 401 You don't have the permission to create classes\nHTTP/1.1 401 unauthorized user token",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Class"
  },
  {
    "type": "delete",
    "url": "/api/v1.0/class/:class_id/:student_id",
    "title": "deletes a student from a Class",
    "version": "1.0.0",
    "name": "Delete_Student_from_class",
    "group": "Class",
    "permission": [
      {
        "name": "authenticated staff With DELETE_STUDENT_FROM_CLASS permissions"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "class_id",
            "optional": false,
            "field": "id",
            "description": "<p>The class's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n\n$http.delete(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Class",
            "description": "<p>Object of Update Class!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n     \"title\": \"English\",\n     \"course_code\": \"ENG101\"\n     \"students\": \"[]\",\n     \"semester\": \"First\",\n     \"teacher\": \"5d65f85b1c9d44005d65f85b1c9d4400\",\n     \"year\" : \"2018\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 you don't permission to edit class\nHTTP/1.1 400 staff not found\nHTTP/1.1 400 no Classes found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Class"
  },
  {
    "type": "get",
    "url": "/api/v1.0/class",
    "title": "Get my Classes",
    "version": "1.0.0",
    "name": "Fetch_Authenticated_Staff_Classes",
    "group": "Class",
    "permission": [
      {
        "name": "authenticated staff with GET_MY_CLASSES permission"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Class",
            "description": "<p>Array of Classes!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n [{\n     \"title\": \"English\",\n     \"course_code\": \"ENG101\"\n     \"students\": \"[]\",\n     \"teacher\" : \"5d65f85b1c9d440055d65f85b1c9d44005\"\n     \"semester\": \"First\",\n     \"year\" : \"2018\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   }],",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 staff not found\nHTTP/1.1 401 You don't have the permission to get classes\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 400 no Classes found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Class"
  },
  {
    "type": "get",
    "url": "/api/v1.0/class/:id",
    "title": "Get a Classes",
    "version": "1.0.0",
    "name": "Fetch_Class",
    "group": "Class",
    "permission": [
      {
        "name": "authenticated staff with GET_CLASS permission"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Class",
            "description": "<p>object of class found!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n {\n     \"title\": \"English\",\n     \"course_code\": \"ENG101\"\n     \"students\": \"[]\",\n     \"semester\": \"First\",\n     \"year\" : \"2018\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   },",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 staff not found\nHTTP/1.1 401 You don't have the permission to get classes\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 400 no Classes found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Class"
  },
  {
    "type": "get",
    "url": "/api/v1.0/class",
    "title": "Get all Classes",
    "version": "1.0.0",
    "name": "Fetch_Classes",
    "group": "Class",
    "permission": [
      {
        "name": "authenticated staff with GET_ALL_CLASSES permission"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Class",
            "description": "<p>Array of Classes!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n [{\n     \"title\": \"English\",\n     \"course_code\": \"ENG101\"\n     \"students\": \"[]\",\n     \"semester\": \"First\",\n     \"year\" : \"2018\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 staff not found\nHTTP/1.1 401 You don't have the permission to get classes\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 400 no Classes found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Class"
  },
  {
    "type": "put",
    "url": "/api/v1.0/class/:id",
    "title": "Update a Class",
    "version": "1.0.0",
    "name": "Update_Class__add_teacher__change_title__course_code_",
    "group": "Class",
    "permission": [
      {
        "name": "authenticated staff With UPDATE_CLASS permissions"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The class's id</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "title",
            "optional": false,
            "field": "The",
            "description": "<p>class's title</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n//the following fields can be updated (teacher, title, course_code, semester, year);\nconst data = {\n   teacher : \"5d65f85b1c9d44005d65f85b1c9d4400\"\n}\n\n$http.put(url, config, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Class",
            "description": "<p>Object of Update Class!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n     \"title\": \"English\",\n     \"course_code\": \"ENG101\"\n     \"students\": \"[]\",\n     \"semester\": \"First\",\n     \"teacher\": \"5d65f85b1c9d44005d65f85b1c9d4400\",\n     \"year\" : \"2018\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 you don't permission to edit class\nHTTP/1.1 400 staff not found\nHTTP/1.1 400 no Classes found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Class"
  },
  {
    "type": "post",
    "url": "/api/v1.0/permission",
    "title": "Create/Add Permission",
    "version": "1.0.0",
    "name": "Create_Permission",
    "group": "Permission",
    "permission": [
      {
        "name": "authenticated staff with CREATE_PERMISSION permission"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>The Staff's role</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "permission",
            "description": "<p>The permission to be added</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\nconst data = {\n  \"role\": \"PRINCIPAL\",\n  \"permission\": \"CREATE_STUDENT\"\n}\n\n$http.post(url, config, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Permission",
            "description": "<p>newly added permission!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n  {\n     \"role\": \"PRINCIPAL\",\n     \"permissions\": \"[{\n         id : \"5d661d5ed5d661d5edcd\"\n         permission: \"CREATE_STUDENT\"\n     }]\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 staff not found\nHTTP/1.1 400 you already have the permission set up for this role\nHTTP/1.1 401 You don't have the permission to create permission\nHTTP/1.1 401 unauthorized user token",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Permission"
  },
  {
    "type": "get",
    "url": "/api/v1.0/permission",
    "title": "Get all Permission",
    "version": "1.0.0",
    "name": "Fetch_Permission",
    "group": "Permission",
    "permission": [
      {
        "name": "authenticated staff with GET_ALL_PERMISSION permission"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Permission",
            "description": "<p>permission details json!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n     \"role\": \"PRINCIPAL\",\n      \"permissions\": \"[{\n         id : \"5d661d5ed5d661d5edcd\"\n         permission: \"CREATE_STUDENT\"\n     }]\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 you don't have the permission to get all permission\nHTTP/1.1 400 no Permission found\nHTTP/1.1 400 no staff found (authenticated staff)",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Permission"
  },
  {
    "type": "get",
    "url": "/api/v1.0/permission/:role",
    "title": "Get Role Permission",
    "version": "1.0.0",
    "name": "Fetch_Permission",
    "group": "Permission",
    "permission": [
      {
        "name": "authenticated staff with GET_PERMISSION permission"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "role",
            "optional": false,
            "field": "role",
            "description": "<p>The Staff's role</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Permission",
            "description": "<p>permission details json!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n {\n     \"role\": \"PRINCIPAL\",\n      \"permissions\": \"[{\n         id : \"5d661d5ed5d661d5edcd\"\n         permission: \"CREATE_STUDENT\"\n     }]\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 you don't have the permission to get a permission\nHTTP/1.1 400 no Permission found\nHTTP/1.1 400 no staff found (authenticated staff)",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Permission"
  },
  {
    "type": "get",
    "url": "/api/v1.0/permissions-available/",
    "title": "Get all permissons available",
    "version": "1.0.0",
    "name": "Fetch_Permissions",
    "group": "Permission",
    "permission": [
      {
        "name": "no authentication required"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\n$http.get(url)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Class",
            "description": "<p>permissions found!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n \"permissions\": {\n    \"createstudent\": \"CREATE_STUDENT\",\n    \"createpermission\": \"CREATE_PERMISSION\",\n    \"updatestudent\": \"UPDATE_STUDENT\",\n    \"deletestudent\": \"DELETE_STUDENT\",\n    \"createstaff\": \"CREATE_STAFF\",\n    \"getallstaff\": \"GET_ALL_STAFF\",\n    \"getstaff\": \"GET_STAFF\",\n    \"updatestaff\": \"UPDATE_STAFF\",\n    \"deletestaff\": \"DELETE_STAFF\",\n    \"getallpermission\": \"GET_ALL_PERMISSION\",\n    \"getpermission\": \"GET_PERMISSION\",\n    \"removepermission\": \"REMOVE_PERMISSION\",\n    \"createclasses\": \"CREATE_CLASSES\",\n    \"getallclasses\": \"GET_ALL_CLASSES\",\n    \"getclass\": \"GET_CLASS\",\n    \"updateclasses\": \"UPDATE_CLASSES\",\n    \"getmyclasses\": \"GET_MY_CLASSES\",\n    \"addstudenttoclass\": \"ADD_STUDENT_TO_CLASS\"\n  }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 204 no roles found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Permission"
  },
  {
    "type": "delete",
    "url": "/api/v1.0/permission/:role/:type",
    "title": "Remove Role Permission",
    "version": "1.0.0",
    "name": "Remove_Permission",
    "group": "Permission",
    "permission": [
      {
        "name": "authenticated staff with REMOVE_PERMISSION permission"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "role",
            "optional": false,
            "field": "role",
            "description": "<p>The Staff's role</p>"
          },
          {
            "group": "Parameter",
            "type": "type",
            "optional": false,
            "field": "type",
            "description": "<p>The Permission type</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.delete(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Permission",
            "description": "<p>updated permission details json!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n {\n     \"role\": \"PRINCIPAL\",\n      \"permissions\": \"[]\",\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 you don't have the permission to remove permission\nHTTP/1.1 400 no Permission found\nHTTP/1.1 400 no staff found (authenticated staff)",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Permission"
  },
  {
    "type": "get",
    "url": "/api/v1.0/roles/",
    "title": "Get all roles",
    "version": "1.0.0",
    "name": "Fetch_Roles",
    "group": "Roles",
    "permission": [
      {
        "name": "no authentication required"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "\n\n$http.get(url)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Class",
            "description": "<p>roles found!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n \"roles\": {\n    \"student\": \"STUDENT\",\n     \"principal\": \"PRINCIPAL\",\n     \"admin\": \"ADMIN\",\n     \"teacher\": \"TEACHER\"\n     \"finance\": \"FINANCE\",\n     \"management\": \"MANAGEMENT\",\n     \"general\": \"GENERAL\",\n     \"contractor\": \"CONTRACTOR\"\n   },",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 204 no roles found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "/api/v1.0/staff",
    "title": "Create a Staff",
    "version": "1.0.0",
    "name": "Create_Staff",
    "group": "Staff",
    "permission": [
      {
        "name": "authenticated staff with CREATE_STAFF permission"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>The Staff's firstname</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>The Staff's lastname</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "middlename",
            "description": "<p>The Staff's middlename</p>"
          },
          {
            "group": "Request body",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": "<p>The Staff's email</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\nconst data = {\n  \"firstname\": \"John\",\n  \"middlename\": \"Franker\",\n  \"lastname\": \"numb\",\n  \"email\": \"John@gmail.com\"\n}\n\n$http.post(url, config, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Staff",
            "description": "<p>newly created staff!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n {\n     \"firstname\": \"John\",\n     \"middlename\": \"Franker\",\n     \"lastname\" : \"numb\",\n     \"email\" : \"john@gmail.com\",\n     \"password\" : hashed(numb),\n     \"role\" : \"TEACHER\"\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     \"deleted\": false\n   },\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 staff not found\nHTTP/1.1 400 staff already exists\nHTTP/1.1 401 You don't have the permission to create staff\nHTTP/1.1 401 unauthorized user token",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Staff"
  },
  {
    "type": "get",
    "url": "/api/v1.0/staff/id",
    "title": "Get all Staff",
    "version": "1.0.0",
    "name": "Fetch_Staff",
    "group": "Staff",
    "permission": [
      {
        "name": "authenticated staff with GET_STAFF permission"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The staff's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Staff",
            "description": "<p>staff detais json!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n     \"firstname\": \"John\",\n     \"middlename\": \"Franker\",\n     \"lastname\" : \" numb\",\n     \"email\" : \"john@gmail.com\",\n     \"role\" : \"TEACHER\"\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     \"deleted\": false\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 you don't permission to get staff\nHTTP/1.1 400 no staff found (authenticated staff)",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Staff"
  },
  {
    "type": "get",
    "url": "/api/v1.0/staff",
    "title": "Get all Staff",
    "version": "1.0.0",
    "name": "Fetch_Staff",
    "group": "Staff",
    "permission": [
      {
        "name": "authenticated staff with GET_ALL_STAFF permission"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Staff",
            "description": "<p>Array of Staff!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n[{\n     \"firstname\": \"John\",\n     \"middlename\": \"Franker\",\n     \"lastname\" : \" numb\",\n     \"email\" : \"john@gmail.com\",\n     \"role\" : \"TEACHER\"\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     \"deleted\": false\n   }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 you don't permission to get staff\nHTTP/1.1 400 no staff found (authenticated staff)",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Staff"
  },
  {
    "type": "get",
    "url": "/api/v1.0/staff/myprofile",
    "title": "Get a LoggedIn Staff Profile",
    "version": "1.0.0",
    "name": "Fetch_Staff",
    "group": "Staff",
    "permission": [
      {
        "name": "authenticated staff"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Students",
            "description": "<p>Object of Staff Profile!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n     \"firstname\": \"TimothyStaff\",\n     \"middlename\": \"MeeStaff\",\n     \"lastname\" : \"DoeStaff\",\n     \"email\" : \"Timothymee@gmail.com\",\n     \"role\" : \"PRINCIPAL\"\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     \"deleted\": false\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 no staff found (authenticated staff)",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Staff"
  },
  {
    "type": "put",
    "url": "/api/v1.0/staff/:id",
    "title": "Update a Staff's profile",
    "version": "1.0.0",
    "name": "Update_Staff",
    "group": "Staff",
    "permission": [
      {
        "name": "authenticated staff with UPDATE_STAFF permission"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The staff's id</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "firstname",
            "optional": false,
            "field": "id",
            "description": "<p>The staff's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n//the following fields can be updated (firstname, lastname, middlename, email);\nconst data = {\n   firstname : \"timothymee\"\n}\n\n$http.put(url, config, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Staff",
            "description": "<p>Object of Update Staff!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n     \"firstname\": \"timothymee\",\n     \"middlename\": \"franker\",\n     \"lastname\" : \"numb\",\n     \"email\" : \"john@gmail.com\",\n     \"role\" : \"TEACHER\"\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     \"deleted\": false\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 you don't permission to edit staff\nHTTP/1.1 400 no staff found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Staff"
  },
  {
    "type": "post",
    "url": "/api/v1.0/student",
    "title": "Create a Student",
    "version": "1.0.0",
    "name": "Create_Student",
    "group": "Student",
    "permission": [
      {
        "name": "authenticated staff with CREATE_STUDENT permission"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>The Student's firstname</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>The Student's lastname</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "middlename",
            "description": "<p>The Student's middlename</p>"
          },
          {
            "group": "Request body",
            "type": "Email",
            "optional": false,
            "field": "email",
            "description": "<p>The Student's email</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\nconst data = {\n  \"firstname\": \"Timothy\",\n  \"middlename\": \"Mee\",\n  \"lastname\": \"Doe\",\n  \"email\": \"Timothy@gmail.com\"\n}\n\n$http.post(url, config, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Student",
            "description": "<p>Newly created Student!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n  {\n     \"firstname\": \"Timothy\",\n     \"middlename\": \"Mee\",\n     \"lastname\" : \"Doe\",\n     \"email\" : \"Timothy@gmail.com\",\n     \"password\" : hashed(Doe),\n     \"role\" : \"STUDENT\"\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     \"deleted\": false\n   },",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 staff not found\nHTTP/1.1 400 student already exists\nHTTP/1.1 401 You don't have the permission to create students\nHTTP/1.1 401 unauthorized user token",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Student"
  },
  {
    "type": "delete",
    "url": "/api/v1.0/student/:id",
    "title": "Delete a Student's profile (soft-deletes)",
    "version": "1.0.0",
    "name": "Delete_Student",
    "group": "Student",
    "permission": [
      {
        "name": "authenticated staff with DELETE_STUDENT permission"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The student's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.delete(url, config, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Student deleted successfully!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{ \"Student deleted  successfully\" }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 you don't permission to delete students\nHTTP/1.1 400 no student found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Student"
  },
  {
    "type": "get",
    "url": "/api/v1.0/student/:id",
    "title": "Get a Student's",
    "version": "1.0.0",
    "name": "Fetch_Student",
    "group": "Student",
    "permission": [
      {
        "name": "authenticated staff"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The student's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Students",
            "description": "<p>Array of Students!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n     \"firstname\": \"Timothy\",\n     \"middlename\": \"Mee\",\n     \"lastname\" : \"Doe\",\n     \"email\" : \"Timothy@gmail.com\",\n     \"role\" : \"STUDENT\"\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     \"deleted\": false\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 400 no student found\nHTTP/1.1 400 no staff found (authenticated staff)",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Student"
  },
  {
    "type": "get",
    "url": "/api/v1.0/staff/myprofile",
    "title": "Get a LoggedIn Student Profile",
    "version": "1.0.0",
    "name": "Fetch_Student",
    "group": "Student",
    "permission": [
      {
        "name": "authenticated Student"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Students",
            "description": "<p>Object of Staff Profile!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n     \"firstname\": \"Timothy\",\n     \"middlename\": \"Mee\",\n     \"lastname\" : \"Doe\",\n     \"email\" : \"Timothy@gmail.com\",\n     \"role\" : \"STUDENT\"\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     \"deleted\": false\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 400 no staff found (authenticated staff)",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Student"
  },
  {
    "type": "get",
    "url": "/api/v1.0/student",
    "title": "Get all Student's",
    "version": "1.0.0",
    "name": "Fetch_Students",
    "group": "Student",
    "permission": [
      {
        "name": "authenticated staff"
      }
    ],
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.get(url, config)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "Students",
            "description": "<p>Array of Students!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n[{\n     \"firstname\": \"Timothy\",\n     \"middlename\": \"Mee\",\n     \"lastname\" : \"Doe\",\n     \"email\" : \"Timothy@gmail.com\",\n     \"role\" : \"STUDENT\"\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     \"deleted\": false\n   }]",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 400 no student found\nHTTP/1.1 400 no staff found (authenticated staff)",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Student"
  },
  {
    "type": "put",
    "url": "/api/v1.0/student/:id",
    "title": "Update a Student's profile",
    "version": "1.0.0",
    "name": "Update_Student",
    "group": "Student",
    "permission": [
      {
        "name": "authenticated staff with UPDATE_STUDENT permission"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The student's id</p>"
          }
        ],
        "Request body": [
          {
            "group": "Request body",
            "type": "firstname",
            "optional": false,
            "field": "id",
            "description": "<p>The student's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n//the following fields can be updated (firstname, lastname, middlename, email);\nconst data = {\n   firstname : \"timothymee\"\n}\n\n$http.put(url, config, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "Students",
            "description": "<p>Object of Update Student!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n{\n     \"firstname\": \"timothymee\",\n     \"middlename\": \"Mee\",\n     \"lastname\" : \"Doe\",\n     \"email\" : \"Timothy@gmail.com\",\n     \"role\" : \"STUDENT\"\n     \"created_at\": \"2019-08-28T04:23:28.886+00:00\",\n     \"created_by\": \"5d65f85b1c9d44005d65f85b1c9d4400\"\n     \"deleted\": false\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 you don't permission to edit students\nHTTP/1.1 400 no student found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "Student"
  },
  {
    "type": "delete",
    "url": "/api/v1.0/staff/:id",
    "title": "Delete a staff's profile (soft-deletes)",
    "version": "1.0.0",
    "name": "Delete_staff",
    "group": "staff",
    "permission": [
      {
        "name": "authenticated staff"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "id",
            "description": "<p>The staff's id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "\nconst config = {\n \"x-auth-token\" : \"authenticated staff token\"\n}\n\n$http.delete(url, config, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>staff deleted successfully!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 200 OK\n { \"staff deleted  successfully\" }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "List error",
          "content": "HTTP/1.1 500 Server Error\nHTTP/1.1 401 unauthorized user token\nHTTP/1.1 401 you don't permission to delete staff\nHTTP/1.1 400 no staff found",
          "type": "json"
        }
      ]
    },
    "filename": "./api/v1.0/index.js",
    "groupTitle": "staff"
  }
] });
