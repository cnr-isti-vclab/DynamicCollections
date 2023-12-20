
//-----CONSTANTS----------------------------------------------------------------------
const DC_VERSION	= "1.5";  // version
//------------------------------------------------------------------------------------

function Collection() {
	this.header = {};
	this.header.version = DC_VERSION;
	this.header.date = (new Date()).toString();
	this.header.repository = REPOSITORY;
	this.metadata = {};
	this.metadata.name = "";
	this.metadata.shortName = "";
	this.metadata.author = "";
	this.metadata.link = "";
	this.metadata.notes = "";
	this.objects = {};
	this.comparisons = {};
   this.indices = {};
   this.indices.comp = 100;
};

Collection.prototype = {
//-----------OBJECTS------------------------------------------------

//-----------COMPARISONS--------------------------------------------
addComparison : function () {
   this.indices.comp++;
   var compCode = "CMP_" + this.indices.comp;

   var comp = {};
   comp.name = "Comparison " + (this.indices.comp-100);
   comp.type = "split";
   comp.objects = [];
   comp.annotations = {};
   comp.annotations.version = 1.5;
   comp.annotations.notes = "";
   comp.annotations.views = {};
   comp.annotations.newIndex = 100;

   //add to list
   this.comparisons[compCode] = comp;

   return compCode;
},
resetComparisonAnnotations : function (compCode) {
   this.comparisons[compCode].annotations = {};
   this.comparisons[compCode].annotations.version = 1.5;
   this.comparisons[compCode].annotations.notes = "";
   this.comparisons[compCode].annotations.views = {};
   this.comparisons[compCode].annotations.newIndex = 100;
},
deleteComparison : function (compCode) {
   delete this.comparisons[compCode];
},

//------------HELPERS-------------------------------------------
hasObjectNotes : function (objCode){
	if(this.objects[objCode]){
		if((this.objects[objCode].notes)&&(this.objects[objCode].notes !== ""))
			return true;
	}
	return false;
},
hasObjectAnnotations : function (objCode){
	if(this.objects[objCode]){
		if((this.objects[objCode].views)&&(this.objects[objCode].views.keys(obj).length !== 0))
			return true;
		if((this.objects[objCode].spots)&&(this.objects[objCode].spots.keys(obj).length !== 0))
			return true;			
	}
	return false;
},
//-------------------------------------------------------

}; // Collection.prototype END


//-------------------------------------------------------------------------------------------

function Archive() {
	this.objects = null;
};

Archive.prototype = {
	
	data : function (objCode,field) {
		return this.objects[objCode][field];
	},
	
	findString : function  (objCode,searchString) {
		var tempText = ""
		
		for(const field of SEARCHFIELDS){
			var fval = this.objects[objCode][field];
			if(fval)
				tempText += " " + fval;
		}

		if (tempText.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) return true;
		return false;
	},

	
}; // Archive.prototype END


//-------------------------------------------------------------------------------------------

const NAMING = {
   "OBJECTNAME": {
      "swedish": "Föremålsnamn",
      "norwegian": "Gjenstandsnavn",
      "english": "Object Name"
   },
   "INVENTORY": {
      "swedish": "Inventarienummer",
      "norwegian": "Museumsnummer",
      "english": "Inventory #"
   },
   "MUSEUM": {
      "swedish": "Museum",
      "norwegian": "Museum",
      "english": "Museum"
   },
   "PLACE": {
      "swedish": "Plats",
      "norwegian": "Sted",
      "english": "Place"
   },
   "MATERIAL1": {
      "swedish": "Materialkategori",
      "norwegian": "Materiale",
      "english": "Material Type"
   },
   "MATERIAL2": {
      "swedish": "Material",
      "norwegian": "Spes Materiale",
      "english": "Material"
   },
   "WEIGHT": {
      "swedish": "Vikt",
      "norwegian": "Weight",
      "english": "Weight"
   },
   "ENCUMBRANCE": {
      "swedish": "Encumbrance",
      "norwegian": "Encumbrance",
      "english": "Encumbrance"
   },
   "CATEGORY1": {
      "swedish": "Kategori",
      "norwegian": "Gjenstand",
      "english": "Category"
   },
   "CATEGORY2": {
      "swedish": "Underkategori",
      "norwegian": "Form",
      "english": "Subcategory"
   },
   "CATEGORY3": {
      "swedish": "variant",
      "norwegian": "Variant",
      "english": "Variant"
   },   
   "TYPE": {
      "swedish": "Typ",
      "norwegian": "Type",
      "english": "Type"
   },
   "PERIOD1": {
      "swedish": "Period",
      "norwegian": "Periode",
      "english": "Period"
   },
   "PERIOD2": {
      "swedish": "Underperiod",
      "norwegian": "Datering",
      "english": "Subperiod"
   },
   "DESCRIPTION": {
      "swedish": "Beskrivning",
      "norwegian": "Beskrivelse",
      "english": "Description"
   },
   "FINDPLACE": {
      "swedish": "Fyndplats",
      "norwegian": "Lokalitetsnavn",
      "english": "Find Place"
   },
   "PARISH": {
      "swedish": "Socken",
      "norwegian": "Kommune",
      "english": "Parish"
   },
   "DISTRICT": {
      "swedish": "H&auml;rad",
      "norwegian": "Fylke",
      "english": "District"
   },
   "PROVINCE": {
      "swedish": "Landskap",
      "norwegian": "Province",
      "english": "Province"
   },
   "REFERENCE": {
      "swedish": "Typologiska referenser",
      "norwegian": "Litteratur",
      "english": "Typological references"
   },
   "METADATA_AUTHOR": {
      "swedish": "Metadata författare",
      "norwegian": "Metadata Author",
      "english": "Metadata Author"
   },
   "3D_OBJECT_ID": {
      "swedish": "3D Object ID",
      "norwegian": "3D Object ID",
      "english": "3D Object ID"
   },
   "MEASURE_UNIT": {
      "swedish": "Measure Unit",
      "norwegian": "Measure Unit",
      "english": "Measure Unit"
   },
   "POINTS_NUM": {
      "swedish": "Points",
      "norwegian": "Points",
      "english": "Points"
   },
   "POLYGONS_NUM": {
      "swedish": "Polygons",
      "norwegian": "Polygons",
      "english": "Polygons"
   },
   "TEXTURES_NUM": {
      "swedish": "Textures",
      "norwegian": "Textures",
      "english": "Textures"
   },
   "ACQUISITION_METHOD": {
      "swedish": "Digitization Method",
      "norwegian": "Digitization Method",
      "english": "Digitization Method"
   },
   "DATE": {
      "swedish": "Date",
      "norwegian": "Date",
      "english": "Date"
   },
   "3D_AUTHOR": {
      "swedish": "3D Author",
      "norwegian": "3D Author",
      "english": "3D Author"
   },
   "SOFTWARE": {
      "swedish": "Software Used",
      "norwegian": "Software Used",
      "english": "Software Used"
   },
   "SOFTWARE2": {
      "swedish": "Software Used  (2)",
      "norwegian": "Software Used (2)",
      "english": "Software Used (2)"
   },   
   "SCANS_NUM": {
      "swedish": "Scans",
      "norwegian": "Scans",
      "english": "Scans"
   },
   "PICTURES_NUM": {
      "swedish": "Pictures",
      "norwegian": "Pictures",
      "english": "Pictures"
   },
   "MODEL_NOTES": {
      "swedish": "Notes",
      "norwegian": "Notes",
      "english": "Notes"
   },   
   "PROJECT_FILENAME": {
      "swedish": "Project Filename",
      "norwegian": "Prosjektfilnavn",
      "english": "Project Filename"
   },
   "OBJ_FILENAME": {
      "swedish": "Model Filename",
      "norwegian": "ply-filnavn",
      "english": "Model Filename"
   },
   "TEXTURE_FILENAME": {
      "swedish": "Texture Filename",
      "norwegian": "Teksturfilnavn",
      "english": "Texture Filename"
   },
   "NEXUS_FILENAME": {
      "swedish": "Nexus Filename",
      "norwegian": "Nexus Filename",
      "english": "Nexus Filename"
   }
};
